let ENV = 'pro';
if (process.platform === "win32") ENV = 'dev';

const DIR_PUBLISH = '_pub';

const URL_STORE_DIR = {};
let URL_CACHE_TEXT = {}
let SITE, PAGE_404, API_URL, API_DOMAIN;
reloadCache();
//console.log(SITE);

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mime = require('mime-types');
const express = require('express');

//------------------------------------------------------------------------------

function reloadCache(res) {
    const fileSetting = './_sys/domain.' + ENV + '.json';
    delete require.cache[require.resolve(fileSetting)];
    SITE = require(fileSetting);

    PAGE_404 = SITE['404'].index;
    if (PAGE_404 == null || PAGE_404.length == 0) PAGE_404 = './404/index.html';

    API_URL = '';
    API_DOMAIN = '';
    if (SITE.url && SITE.url.api) {        
        const a = SITE.url.api.split('/');
        if (a.length > 2) {
            API_URL = SITE.url.api;
            API_DOMAIN = a[2].split(':')[0].trim();
        }
    }

    URL_CACHE_TEXT = Object.create({});

    if (res) {
        res.end('CLEAR ALL CACHE ...');
    }
}

function getFullPath(...paths) {
    return paths.reduce((a, b) => path.join(a, b), process.cwd());
}

//------------------------------------------------------------------------------

let app = express();
let http = app.listen(SITE.port);

app.use('/publish', express.static(path.join(__dirname, DIR_PUBLISH)));

app.get("/*", (req, res) => {
    const domain = req.hostname;
    let site, root, file = req.url, ref,
        pathFile, isDynamic = false, isHome = false,
        extension = path.extname(file),
        fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    if (file == '/clear-cache') {
        reloadCache(res);
        return;
    }

    if (extension.length == 0) {
        if (file == '/') {
            isHome = true;
            file = '/index.html';
        }
        else file += '.html';
        isDynamic = true;
        extension = '.html';
    }

    switch (extension) {
        case '.ico'://favicon.ico
            res.end();
            return;
        case '.html':
            site = { dir: 'coming-soon', login: false, browser: false };
            if (SITE.hasOwnProperty(domain)) site = SITE[domain];
            else if (domain.indexOf('login.') == 0) site = SITE['login'];
            if (isHome && site.browser) {
                site = SITE['404'];
                root = './' + site.dir;
                pathFile = site.browser;
            } else {
                root = './' + site.dir;
                pathFile = root + file;
                if (!fs.existsSync(pathFile)) pathFile = PAGE_404;
            }
            URL_STORE_DIR[fullUrl] = site.dir;
            break;
        default:
            ref = req.headers.referer;
            const dir = URL_STORE_DIR[ref];
            //console.log('[2.ref] ', dir, file, ref);
            if (file.indexOf('/' + dir) == -1
                && file.indexOf('/404/') == -1
                && ref && ref.length > 0
                && URL_STORE_DIR.hasOwnProperty(ref))
                pathFile = './' + dir + file;
            else pathFile = '.' + file;
            break;
    }

    if (pathFile.indexOf('?')) pathFile = pathFile.split('?')[0];
    //console.log('[3] ', domain, req.url, pathFile);

    const mimeType = mime.lookup(pathFile);
    if (mimeType != false) res.setHeader('content-type', mimeType);
    if (ENV == 'pro' && URL_CACHE_TEXT.hasOwnProperty(fullUrl)) {
        res.end(URL_CACHE_TEXT[fullUrl]);
    } else {
        if (fs.existsSync(pathFile)) {
            if (extension == '.html' || extension == '.js' || extension == '.css') {
                const s = fs.readFileSync(pathFile);
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

app.post("/*", (req, res) => {
    const domain = req.hostname;
    let site, root, file = req.url, ref;

});
