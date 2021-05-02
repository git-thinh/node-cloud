let IP = '', PORT = 80, ENV = 'pro', CONFIG = {}, PATH_WWW = '', API_ROOT_PATH = 'api';
let CACHE_TEXT = {};
const isConfig = function (domain) { return CONFIG.hasOwnProperty(domain); };

//#region [ INIT ]

CONFIG = require('./config.json');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (IP.length == 0) {
                var pi = net.address;
                if (isConfig(pi)) {
                    //console.log('>>> OK: ' + pi);
                    IP = pi;
                    const cf = CONFIG[IP];
                    PATH_WWW = cf.path_www || '';
                    API_ROOT_PATH = cf.api_root_path || 'api';
                    PORT = cf.port || 0;
                    ENV = cf.environment || 'dev';
                } else console.log(pi);
            }
        }
    }
}

//#endregion

const fs = require("fs");
const PATH = require('path');

const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

//#region [ lodash ]

const _ = require('lodash');
_.templateSettings = {
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
};
/*
 
    {{ _.each(items, function(item) { }}
        <ul>
            <li>Title: {{= item.title }}</li>
            <li>Author: {{= item.author }}</li>
        </ul>
    {{ }); }}

 */
const _lodashComplite = function (template, obj) {
    obj = obj || {};
    try {
        const temp = _.template(template);
        const text = temp(obj);
        return text;
    } catch (e) {
        console.log('>>> ERROR = _lodashComplite: ', template, obj, e.message);
        return '';
    }
};

//#endregion

function app_getImage(req, res, next) {
    if (!isConfig(req.hostname)) res.end();
    else {
        if (req.method == 'GET'
            && req.headers && req.headers.accept) {
            const accept = req.headers.accept;
            //console.log(accept, req.url);
            if (accept.indexOf('image/') == 0
                || accept.indexOf('text/css') == 0
                || accept == '*/*') {
                const file_name = req.url.split('?')[0];
                const domain = req.hostname;
                if (CONFIG.hasOwnProperty(domain)) {
                    const cf = CONFIG[domain];
                    const file = PATH_WWW + cf.dir + file_name;
                    //console.log(domain, file);
                    if (fs.existsSync(file)) res.sendFile(file);
                    else res.status(404).send('Not found');
                    return;
                }
            }
        }
        next();
    }
}
app.use(app_getImage);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isCacheText = function (file) { return CACHE_TEXT.hasOwnProperty(file); };
function readFileCache(file) {
    let html = '';
    if (fs.existsSync(file)) {
        html = fs.readFileSync(file);
        CACHE_TEXT[file] = html;
    }
    return html;
}

function app_getHtmlPage(req, res) {
    const domain = req.hostname,
        cf = CONFIG[domain],
        url = req.url.split('?')[0],
        is_browser = req.url.indexOf('[ALL]') != -1;
    let path = url;
    if (!url.endsWith('.html')) path += 'index.html';
    let file = PATH_WWW + cf.dir + path;
    //console.log(is_browser, path, file);

    if (is_browser) {
        const path_dir = PATH.dirname(path);
        const full_path = PATH.dirname(file);
        console.log('[2] = ', path_dir, full_path);
        if (fs.existsSync(full_path)) {
            let temp = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
            let dirs = fs.readdirSync(full_path);

            let link, uri = req.protocol + '://' + domain + ':' + PORT + path_dir;
            if (path_dir[path_dir.length - 1] != '/') uri += '/';

            //console.log('5.2 = ', dirs);
            dirs.forEach(function (name) { 
                if (fs.lstatSync(full_path + '/' + name).isDirectory()) link = uri + name + '/?[ALL]';
                else link = uri + name;
                //console.log('5.3 = ', link);
                temp += '<h3><a href="' + link + '" target="_blank" style="text-decoration:none;">' + name + '</a></h3>';
            });
            res.set('Content-Type', 'text/html');
            res.end(temp);

        } else res.end('Cannot found path [2]: ' + full_path);
    } else {
        //console.log('[1] = ', file);
        let html = '';
        if (isCacheText(file)) html = CACHE_TEXT[file];
        else html = readFileCache(file);
        res.set('Content-Type', 'text/html');
        res.end(html);
    }
}

app.get("/", app_getHtmlPage);

//#region [ /landing /cache/clear ]


app.get("/landing", (req, res) => {
    let temp = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    let keys = Object.keys(CONFIG);
    keys.forEach(function (key, index) {
        let cf = CONFIG[key];
        if (cf.landing == true)
            temp += '<h3><a href="http://' + key + ':' + PORT + '" target="_blank" style="text-decoration:none;">[' + (index + 1).toString() + '] ' + key + '</a></h3>';
    });
    res.set('Content-Type', 'text/html');
    res.end(temp);
});

app.get("/cache/clear", (req, res) => {
    CACHE_TEXT = Object.create({});
    delete require.cache[require.resolve('./config.json')];
    CONFIG = require('./config.json');
    res.json({ ok: true });
    res.end();
});

//#endregion

//#region [ html2pdf ]

app.get('/' + API_ROOT_PATH + '/html2pdf', (req, res) => {
    let arr = [], p = './html2pdf';
    if (fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get('/' + API_ROOT_PATH + '/html2pdf/:project_code', (req, res) => {
    let arr = [], p = './html2pdf/' + req.params.project_code;
    if (req.params && req.params.project_code && fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get('/' + API_ROOT_PATH + '/html2pdf/:project_code/:template_code', (req, res) => {
    let arr = [], p = './html2pdf/' + req.params.project_code + '/' + req.params.template_code;
    if (req.params && req.params.project_code
        && req.params.template_code && fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get('/' + API_ROOT_PATH + '/html2pdf/:project_code/:template_code/:language_code', (req, res) => {
    let html = '', p = './html2pdf/' + req.params.project_code + '/'
        + req.params.template_code + '/'
        + req.params.language_code;

    if (req.params && req.params.project_code
        && req.params.template_code
        && req.params.language_code
        && fs.existsSync(p)) html = fs.readFileSync(p).toString('utf8');

    res.setHeader('Content-Type', 'text/plain');
    res.end(html);
});

app.put('/' + API_ROOT_PATH + '/html2pdf/:project_code/:template_code/:language_code', (req, res) => {
    let html = '',
        p = './html2pdf/' + req.params.project_code + '/' + req.params.template_code,
        file_name = req.params.language_code;

    if (req.params && req.params.project_code
        && req.params.template_code
        && req.params.language_code
        && fs.existsSync(p)) {
        if (req.is('text/*')) {
            req.text = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                req.text += chunk;
            });
            req.on('end', function () {
                html = req.text;
                let f = p + '/' + file_name;
                //console.log(f, html);
                fs.writeFileSync(f, html);
                res.json({ ok: true, path: p, file: file_name });
                res.end();
            });
            return;
        }
    }
    res.json({ ok: false, path: p, file: file_name });
    res.end();
});

app.post('/' + API_ROOT_PATH + '/html2pdf', (req, res) => {
    let rs = req.body || {};
    rs.file = '';
    rs.ok = false;
    rs.error = '';

    if (req.body != null && req.body.data) {
        let html = '',
            file = './html2pdf/' + req.body.project_code + '/' + req.body.template_code + '/' + req.body.language_code;
        if (fs.existsSync(file)) {
            const s = fs.readFileSync(file).toString('utf8');

            let data = req.body.data || {};
            data._ = _;

            html = _lodashComplite(s, data);
            let file_name = (new Date()).getTime();
            printPDF(file_name, html).then(function (pdf) {
                //res.setHeader('Content-Length', pdf.length);
                //res.setHeader('Content-Type', 'application/pdf');
                //res.setHeader('Content-Disposition', 'attachment; filename=' + file_name + '.pdf');
                //res.end(pdf);
                rs.file = file_name;
                rs.ok = true;
                res.json(rs);
                res.end();
            });
            return;
        } else rs.error = 'Cannot found the file ' + file;
    } else rs.error = 'The body of post request is NULL';

    res.json(rs);
    res.end();
});

//#endregion

app.get("/*", app_getHtmlPage);

if (IP.length == 0 || PATH_WWW.length == 0 || !fs.existsSync(PATH_WWW)) {
    console.log('>>> ERROR = Please setting IP with path_www not found ' + PATH_WWW);
} else {
    console.log('>>> OK = ' + ENV + '://' + IP + ':' + PORT);
    http.createServer(app).listen(PORT);
    https.createServer({ key: fs.readFileSync('./ssl/co.ibds.key'), cert: fs.readFileSync('./ssl/co.ibds.crt') }, app).listen(443);
}