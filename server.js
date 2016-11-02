
var delay = 0;

var express = require('express'),
    http    = require('http'),
    rails   = require('./server/rails'),
    config  = require('./server/config'),
    cors    = require('cors'),
    bodyParser = require('body-parser');

var app = express()
  .use(bodyParser.urlencoded({extended: false}))
  .use(cors())
  .use(express.static('app'));

var serverPort = config.getServerPort();
var serverIpAddress = config.getServerIp();
var server = http.createServer(app);


app.post('/api/nextTrain', function  (req, res) {
    var reqTT = req.body;

    rails.nextTrain(reqTT, function (err, tt) {

        if (err) {
            console.log('ERROR Finding Next Train: ', err);
        } else {
            outputJSON(res, tt);
        }
    });
});


app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});


server.listen(serverPort, serverIpAddress, function () {
    console.log( "Listening on " + serverIpAddress + ", port " + serverPort )
});

function outputJSON(res, obj) {
  setTimeout(function () {
    res.json(obj);
    res.end();
  }, delay)
}
