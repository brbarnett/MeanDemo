var express = require('express');

var app = express();
var port = process.env.PORT || 1337;

// serve static files
app.use(express.static('public'));

// register routes
require('./routes')(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});