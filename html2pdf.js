const PORT = 12389;

const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const app = express();
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
        console.log('_lodashComplite: ERROR = ', template, obj, e);
        return '';
    }
};

async function printPDF(file_name, html) {
    let pathFile = './file/' + file_name + '.pdf';
    //let finalHtml = encodeURIComponent('<h1>' + (new Date).toString() + '</h1>');
    let finalHtml = encodeURIComponent(html);
    let options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: pathFile
    };

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    //await page.goto('https://blog.risingstack.com', { waitUntil: 'networkidle0' });
    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf(options);
    await browser.close();

    return pdf;
}

app.get("/", (req, res) => { res.end('OK'); });
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

http.createServer(app).listen(PORT);