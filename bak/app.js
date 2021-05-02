let ENV = 'pro';
if (process.platform === "win32") ENV = 'dev';

const DIR_PUBLISH = '_pub';

const URL_STORE_DIR = {};
let URL_CACHE_TEXT = {}
let SITE = require('./_sys/domain.' + ENV + '.json');
const ROOT_TEMPLATE = SITE.path.template;

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mime = require('mime-types');
const { release } = require('process');
const UGLIFY_JS = require("uglify-js");

const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

app.use('/publish', express.static(path.join(__dirname, DIR_PUBLISH)));

function __vue_com_render_js(theme_code, is_minify) {
    let vg = '', vjs = '', temp = '', s = '', config = '';

    vg += fs.readFileSync('./kit/io/lodash.min.js');
    vg += fs.readFileSync('./kit/io/vue.min.js');

    vjs += fs.readFileSync('./kit/io/_init.js');
    vjs += fs.readFileSync('./kit/io/mixin.js');
    vjs += fs.readFileSync('./kit/io/global.js');
    vjs += fs.readFileSync('./kit/io/config.js');

    if (fs.existsSync('./kit/io/config/' + theme_code + '.js'))
        config = '\r\n\r\n/* [ CONFIG ] */\r\n var __vue_vc_config = function(){ \r\n ' + fs.readFileSync('./kit/io/config/' + theme_code + '.js').toString('utf8').trim() + ' \r\n } \r\n';
    else
        config = '\r\n\r\n/* [ CONFIG ] */\r\n var __vue_vc_config = function(){ \r\n  \r\n } \r\n';

    temp = '';
    a = fs.readdirSync('./kit/io/com/base');
    a.forEach(function (file) { temp += __vue_com_render_js_item(theme_code, is_minify, 'base', file); });
    a = fs.readdirSync('./kit/io/com/kit');
    a.forEach(function (file) { temp += __vue_com_render_js_item(theme_code, is_minify, 'kit', file); });
    a = fs.readdirSync('./kit/io/com/widget');
    a.forEach(function (file) { temp += __vue_com_render_js_item(theme_code, is_minify, 'widget', file); });

    s = vg + vjs + config + temp;
    return s;
}

function __vue_com_render_js_item(theme_code, is_minify, type, file_name) {
    let name = file_name.substr(0, file_name.length - 3),
        file = '',
        s = '',
        temp = '',
        f_render = '',
        render = '';

    file = './kit/io/com/' + type + '/' + file_name;

    if (fs.existsSync(file)) {
        f_render = './kit/io/render/' + theme_code + '/' + file_name;
        if (fs.existsSync(f_render)) render = fs.readFileSync(f_render).toString('utf8').trim();
        else {
            f_render = './kit/io/render/_/' + file_name;
            if (fs.existsSync(f_render)) render = fs.readFileSync(f_render).toString('utf8').trim();
        }
        if (render.length == 0) render = 'return createElement("div",{ class: "vc-com vc-' + name + ' vc-error vc-message" },["The component ' + name + ' does not find a function for rendering virtual DOM"]);';

        temp = fs.readFileSync(file).toString('utf8').trim().substr(1).trim();
        if (temp.length == 0) temp = '}';

        s += '\r\n\r\n/* [ ' + name + ' ] */ \r\n' +
            'Vue.component("ui-' + name + '", {\r\n' +
            '\t mixins: [__VC_MIXIN],\r\n' +

            '\t data: function () { \r\n\t\t\t __vc_data_init(this, "' + name + '"); ' +
            '\r\n\t\t\t var data = this._initData(___VC_DATA["' + name + '"]); ' +
            '\r\n\t\t\t ___VC_DATA["' + name + '"] = data; ' +
            '\r\n\t\t\t return ___VC_DATA["' + name + '"]; ' +
            '\r\n\t },\r\n' +

            '\t render: function (createElement) { \r\n\t\t ' + render + '\r\n\t }';
        if (temp[0] == '}') s += '\r\n})\r\n'; else s += ',\r\n\t' + temp + ')\r\n';
    }
    return s;
}

function __vue_com_render_css(theme_code, is_minify) {
    let s = '';
    a = fs.readdirSync('./kit/io/style/_');
    a.forEach(function (file) { s += fs.readFileSync('./kit/io/style/_/' + file).toString('utf8').trim() + '\r\n\r\n'; });

    s += '\r\n/* ====================== */';
    s += '\r\n/* [ ' + theme_code + ' ] */\r\n\r\n';
    a = fs.readdirSync('./kit/io/style/' + theme_code);
    a.forEach(function (file) { s += fs.readFileSync('./kit/io/style/' + theme_code + '/' + file).toString('utf8').trim() + '\r\n\r\n'; });

    return s;
}

app.get("/*", (req, res) => {
    const domain = req.hostname, is_template = domain.endsWith('.ibds.co');
    let site, root, file = req.url.split('?')[0],
        ref, theme_code = '', temp = '',
        pathFile, isDynamic = false,
        extension = path.extname(file),
        fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    //console.log(is_template, req.originalUrl);

    switch (file) {
        case '/__cus.css':
            pathFile = ROOT_TEMPLATE + '/custom' + file;
            if (fs.existsSync(pathFile))
                temp = fs.readFileSync(pathFile).toString('utf8').trim();
            res.set('Content-Type', 'text/css');
            res.end(temp);
            return;
        case '/__cus.js':
            pathFile = ROOT_TEMPLATE + '/custom' + file;
            if (fs.existsSync(pathFile))
                temp = fs.readFileSync(pathFile).toString('utf8').trim();
            res.set('Content-Type', 'text/javascript');
            res.end(temp);
            return;
        case '/__cus_config.js':
            pathFile = ROOT_TEMPLATE + '/custom' + file + 'on';
            if (fs.existsSync(pathFile))
                temp = 'var CONFIG__ =  ' + JSON.stringify(JSON.parse(fs.readFileSync(pathFile).toString('utf8').trim()));
            else temp = 'var CONFIG__ = {} ';
            res.set('Content-Type', 'text/javascript');
            res.end(temp);
            return;
        case '/io.js':
            theme_code = req.query.theme;
            temp = __vue_com_render_js(theme_code, false);
            res.set('Content-Type', 'text/javascript');
            res.end(temp);
            return;
        case '/io.css':
            theme_code = req.query.theme;
            temp = __vue_com_render_css(theme_code, false);
            res.set('Content-Type', 'text/css');
            res.end(temp);
            return;
        case '/test':
            temp = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            Object.keys(SITE).forEach(function (key_, index_) {
                if (!key_.endsWith('ibds.co'))
                    temp += '<h3><a href="http://' + key_ + '" target="_blank" style="text-decoration:none;">[' + (index_ + 1).toString() + '] ' + key_ + '</a></h3>';
            });
            res.set('Content-Type', 'text/html');
            res.end(temp);
            return;
        case '/landing':
            temp = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            Object.keys(SITE).forEach(function (key_, index_) {
                if (key_.endsWith('ibds.co'))
                    temp += '<h3><a href="https://' + key_ + '" target="_blank" style="text-decoration:none;">[' + (index_ + 1).toString() + '] ' + key_ + '</a></h3>';
            });
            res.set('Content-Type', 'text/html');
            res.end(temp);
            return;
        case '/clear-cache':
            URL_CACHE_TEXT = Object.create({});

            pathFile = './_sys/domain.' + ENV + '.json';
            delete require.cache[require.resolve(pathFile)];
            SITE = require(pathFile);

            res.end('CLEAR ALL CACHE ...');
            return;
        case '/ui-kit.json':
            const coms = [];
            const groups = fs.readdirSync('./kit/ui');
            groups.forEach(function (group) {
                const kits = fs.readdirSync('./kit/ui/' + group);
                kits.forEach(function (kit) {
                    const files = fs.readdirSync('./kit/ui/' + group + '/' + kit);
                    coms.push({ group: group, name: kit, files: files });
                });
            });
            res.json({ ok: true, data: coms });
            return;
    }

    if (extension.length == 0) {
        if (file == '/') file = '/index.html';
        else file += '.html';
        isDynamic = true;
        extension = '.html';
    }

    switch (extension) {
        case '.ico'://favicon.ico
            res.end();
            return;
        case '.html':
            site = { dir: 'coming-soon', login: false };
            if (SITE.hasOwnProperty(domain)) site = SITE[domain];
            else if (domain.indexOf('login.') == 0) site = SITE['login'];
            root = './' + site.dir;
            if (is_template) root = ROOT_TEMPLATE + site.dir;
            //console.log('[1] HTML = ', root, file);
            pathFile = root + file;
            if (!fs.existsSync(pathFile)) pathFile = './404/index.html';
            //URL_STORE_DIR[fullUrl] = site.dir;
            URL_STORE_DIR[fullUrl] = site.dir;
            break;
        default:
            if (req.originalUrl.startsWith('/_static/')) {
                pathFile = '.' + file;
            } else {
                ref = req.headers.referer;
                const dir = URL_STORE_DIR[ref];
                if (file.indexOf('/' + dir) == -1 && ref && ref.length > 0 && URL_STORE_DIR.hasOwnProperty(ref))
                    pathFile = './' + dir + file;
                else pathFile = '.' + file;
            }
            break;
    }

    if (pathFile.indexOf('?')) pathFile = pathFile.split('?')[0];
    //console.log('[3] ', is_template, domain, req.url, pathFile);

    const mimeType = mime.lookup(pathFile);
    if (mimeType != false) res.setHeader('content-type', mimeType);
    if (ENV == 'pro' && URL_CACHE_TEXT.hasOwnProperty(fullUrl)) {
        res.end(URL_CACHE_TEXT[fullUrl]);
    } else {
        if (fs.existsSync(pathFile)) {
            if (extension == '.html' || extension == '.js' || extension == '.css') {
                let s = fs.readFileSync(pathFile);
                if (extension == '.html') {
                    if (s.indexOf('<_') > 0) {
                        let text = s.toString('utf8');
                        let a = text.split('<_');
                        a = _.filter(a, function (o) { return o.indexOf('/>') > 0 });
                        a = _.map(a, function (o) { return o.split('/>')[0]; });
                        //console.log(a);
                        if (a.length > 0) {
                            for (let i = 0; i < a.length; i++) {
                                let url_ = './' + site.dir + '/_' + a[i] + '.html';
                                if (ENV == 'pro' && URL_CACHE_TEXT.hasOwnProperty(a[i])) {
                                    text = text.replace('<_' + a[i] + '/>', URL_CACHE_TEXT[a[i]].toString('utf8').trim());
                                } else {
                                    if (fs.existsSync(url_)) {
                                        const bt = fs.readFileSync(url_);
                                        URL_CACHE_TEXT[a[i]] = bt;
                                        text = text.replace('<_' + a[i] + '/>', bt.toString('utf8').trim());
                                    }
                                }
                            }
                        }
                        s = text;
                    }

                    if (s.indexOf('</body>') === -1 || s.indexOf('</html>') === -1) {
                        s += '<link href="/__cus.css" rel="stylesheet" type="text/css">' +
                            '<script type="text/javascript" src="/__cus_config.js"></script>' +
                            '<script type="text/javascript" src="/__cus.js"></script>' +
                            '</body></html>';
                    }
                }
                URL_CACHE_TEXT[fullUrl] = s;
                res.end(s);
            } else {
                const src = fs.createReadStream(pathFile);
                src.pipe(res);
            }
        } else {
            res.end();
        }
    }
});

if (ENV === 'pro') SITE.port = 80;
http.createServer(app).listen(SITE.port);
https.createServer({
    key: fs.readFileSync('./_sys/co.ibds.key'),
    cert: fs.readFileSync('./_sys/co.ibds.crt')
}, app).listen(443);