var express = require('express');
var birds = require('./birds');

var app = express();
app.use('/birds', birds);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var server = app.listen(3444, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});