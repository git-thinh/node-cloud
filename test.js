let IP = '', PORT = 80, ENV = 'pro', SITE;

//#region [ INIT ]

if (process.platform === "win32") {
    ENV = 'dev';
    PORT = 12123;
}
SITE = require('./_sys/domain.' + ENV + '.json');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (IP.length == 0) {
                var pi = net.address;
                console.log(pi);
                if (SITE.hasOwnProperty(pi)) {
                    console.log('>>> OK: ' + pi);
                    IP = pi;
                }
            }
        }
    }
}

//#endregion

const fs = require("fs");

const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        console.log('_lodashComplite: ERROR = ', template, obj, e.message);
        return '';
    }
};

app.get("/", (req, res) => { res.end('OK'); });

//#region [ html2pdf ]

app.get("/html2pdf", (req, res) => {
    let arr = [], p = './html2pdf';
    if (fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get("/html2pdf/:project_code", (req, res) => {
    let arr = [], p = './html2pdf/' + req.params.project_code;
    if (req.params && req.params.project_code && fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get("/html2pdf/:project_code/:template_code", (req, res) => {
    let arr = [], p = './html2pdf/' + req.params.project_code + '/' + req.params.template_code;
    if (req.params && req.params.project_code
        && req.params.template_code && fs.existsSync(p)) arr = fs.readdirSync(p);
    res.json(arr);
    res.end();
});

app.get("/html2pdf/:project_code/:template_code/:language_code", (req, res) => {
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

app.put("/html2pdf/:project_code/:template_code/:language_code", (req, res) => {
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

app.post("/html2pdf", (req, res) => {
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

http.createServer(app).listen(PORT);
https.createServer({ key: fs.readFileSync('./_sys/co.ibds.key'), cert: fs.readFileSync('./_sys/co.ibds.crt') }, app).listen(443);