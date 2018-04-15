
const fs = require('fs');
const formidable = require('formidable');

function start(response) {
    console.log('Request handler \'start\' was called.');

    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype ="multipart/form-data" ' +
        'method="post">' +
        '<input type= "file" name="upload" multiple="multiple"> ' +
        '<input type="submit" value="Upload File" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log('Request handler \'upload\' was called.');

    const form = new formidable.IncomingForm();
    console.log('About to parse');
    form.parse(request, function(err, fields, files) {
        if(err) {
            fs.unlink('/tmp/test.png');
            fs.rename(files.upload.path, '/tmp/test.png');
        }
    });
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write("Received image: <br />");
    response.write("<img src='/show' />");
    response.end();
}

function show(response) {
    console.log('Request handler \'show\' was called.');
    response.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;    
    