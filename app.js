let ENV = 'dev'; //pro

const DIR_PUBLISH = '_pub';

let SITE = require('./_sys/domain.' + ENV + '.json');
//console.log(SITE);

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mime = require('mime-types');
const express = require('express');
const { release } = require('process');

let app = express();
let http = app.listen(process.env.PORT || 1233);

app.use('/publish', express.static(path.join(__dirname, DIR_PUBLISH)));

app.get("/*", (req, res) => {
    const domain = req.host;
    let root = '', file = req.url, pathFile = '';
    console.log('[2] ', domain, req.method, file);

    if (req.method == 'GET') {
        if (file.endsWith('favicon.ico')) {
            res.end();
            return;
        } else {
            let site = {
                dir: 'coming-soon',
                login: false
            };
            if (SITE.hasOwnProperty(domain)) site = SITE[domain];
            else if (domain.indexOf('login.') == 0) site = SITE['login'];
            root = './' + site.dir;

            switch (file) {
                case '/test':
                    res.end();
                    return;
                default:
                    if (file == '/') file = '/index.html';
                    pathFile = root + file;
                    if (pathFile.indexOf('?')) pathFile = pathFile.split('?')[0];

                    console.log('[3] ' + pathFile);

                    if (fs.existsSync(pathFile)) {
                        const mimeType = mime.lookup(pathFile);
                        if (mimeType == false) {
                            ;
                        } else {
                            res.setHeader('content-type', mimeType);
                        }
                        const src = fs.createReadStream(pathFile);
                        src.pipe(res);
                    } else {
                        res.send('Error, Cannot find the file: ' + pathFile);
                        res.end();
                    }
                    break;
            }

            //res.send('Hi, Time is ' + (new Date()).toString());
            //res.end();
            return;
        }
    }
    res.send('Hi, Time is ' + (new Date()).toString());
    res.end();
});









