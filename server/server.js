
var delay = 0;

var express = require('express'),
    http    = require('http'),
    rails   = require('./rails'),
    config  = require('./config'),
    cors    = require('cors');

var app = express();
var serverPort = config.getServerPort();
var serverIpAddress = config.getServerIp();
var server = http.createServer(app);

app.use(express.bodyParser());
app.use(cors());
app.use(express.static('www'));

app.post('/api/nextTrain', function  (req, res) {
    var reqTT = req.body;
    //console.log('reqTT: ', reqTT);

    rails.nextTrain(reqTT, function (err, tt) {

        if (err) {
            console.log('ERROR Finding Next Train: ', err);
        } else {
            outputJSON(res, tt);
        }
    });
});

app.post('/api/originStation', function  (req, res) {
  var reqTT = req.body;
  //console.log('reqTT: ', reqTT);

  rails.originStation(reqTT, function (err, tt) {

    if (err) {
      console.log('ERROR Finding Origin Train: ', err);
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
