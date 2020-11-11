let ENV = 'pro';
if (process.platform === "win32") ENV = 'dev';

const DIR_PUBLISH = '_pub';

const URL_STORE_DIR = {};
let URL_CACHE_TEXT = {}
let SITE = require('./_sys/domain.' + ENV + '.json');
//console.log(SITE);

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mime = require('mime-types');
const express = require('express');
const { release } = require('process');

let app = express();
let http = app.listen(SITE.port);

app.use('/publish', express.static(path.join(__dirname, DIR_PUBLISH)));

app.get("/*", (req, res) => {
    const domain = req.host;
    let site, root, file = req.url, ref,
        pathFile, isDynamic = false,
        extension = path.extname(file),
        fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    if (file == '/clear-cache') {
        URL_CACHE_TEXT = Object.create({});
        res.end('CLEAR ALL CACHE ...');
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
            pathFile = root + file;
            if (!fs.existsSync(pathFile)) pathFile = './404/index.html';
            URL_STORE_DIR[fullUrl] = site.dir;
            break;
        default:
            ref = req.headers.referer;
            if (ref && ref.length > 0 && URL_STORE_DIR.hasOwnProperty(ref))
                pathFile = './' + URL_STORE_DIR[ref] + file;
            else pathFile = '.' + file;
            break;
    }

    if (pathFile.indexOf('?')) pathFile = pathFile.split('?')[0];
    //console.log('[3] ', domain, req.url, pathFile);

    const mimeType = mime.lookup(pathFile);
    if (mimeType != false) res.setHeader('content-type', mimeType);
    if (URL_CACHE_TEXT.hasOwnProperty(fullUrl)) {
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









