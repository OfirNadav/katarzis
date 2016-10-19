var cheerio     = require("cheerio"),
    request     = require('request'),
    assert      = require('assert'),
    config      = require('./config'),
    MongoClient = require('mongodb').MongoClient;


var dbConn = null;

var mongoUrl = config.getMongoUrl();
//console.log('mongoUrl: ', mongoUrl);
MongoClient.connect(mongoUrl, function(err, db) {
  assert.equal(null, err);
  console.log( 'Connected correctly to MongoDB server.');

  dbConn = db;
});

// db.close();


module.exports.originStation = function (reqTT, cb){
    getNearestStationId(reqTT, function (nearestStationId) {
      cb(null, nearestStationId);
    });
};

module.exports.nextTrain = function (reqTT, cb){
    //console.log('nextTrain reqTT: ',reqTT);
    getNearestStationId(reqTT, function (nearestStationId) {

        var tt = {
            originStationId: nearestStationId,
            destStationId: reqTT.destStationId,
            date: new Date(),
            nextTrains: []
        };

        //console.log('tt: ', tt);

        var trainUrl = getTrainUrl(tt);

        download(trainUrl, function(strHtml) {

          tt.nextTrains = getNextTrainTimestamp(strHtml);

          do {
            if (tt.nextTrains.length){
              cb(null, tt);
            } else {
              var newDate = new Date(tt.date);
              tt.date = newDate.setHours(newDate.getHours() + 1);
              trainUrl = getTrainUrl(tt);
              tt.nextTrains = getNextTrainTimestamp(strHtml);
            }
          } while (!tt.nextTrains.length);
        });
    });
};

// format the date as YYYY-MM-DD
Date.prototype.yyyymmdd = function() {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

// convert timeStr to Timestamp
function timeStr2Timestamp(timeStr) {
    var result = timeStr.split(':');

    var date = new Date();
    // Seconds part from the timestamp
    var seconds = parseInt(date.getSeconds());

    result.push(seconds);

    date.setHours(result[0]);
    date.setMinutes(result[1]);
    date.setSeconds(result[2]);

    return date;
}

// download the generated url
function download(url, callback) {

// Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    };

// Configure the request
    var options = {
        url: url,
        method: 'GET',
        headers: headers
        //qs: {'key1': 'xxx', 'key2': 'yyy'}
    };

// Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else callback(null);
    })
}

// Generate the url
function getTrainUrl(tt) {

    var trainUrlTemplate = "http://www.rail.co.il/HE/DrivePlan/Pages/DrivePlan.aspx?" +
        "DrivePlanPage=true" +
        "&OriginStationId=%OriginStationId%" +
        "&DestStationId=%DestStationId%" +
        "&HoursDeparture=%HoursDeparture%" +
        "&MinutesDeparture=%MinutesDeparture%" +
        "&HoursReturn=all" +
        "&MinutesReturn=0" +
        "&GoingHourDeparture=true" +
        "&ArrivalHourDeparture=false" +
        "&GoingHourReturn=true" +
        "&ArrivalHourReturn=false" +
        "&IsReturn=false" +
        "&GoingTrainCln=%GoingTrainCln%" +
        "&ReturnningTrainCln=%GoingTrainCln%" +
        "&IsFullURL=true";

    var date = new Date(tt.date);

    // Hours part from the timestamp
    var hours = parseInt(date.getHours());

    // Minutes part from the timestamp
    var minutes = parseInt(date.getMinutes());

    var trainUrl = trainUrlTemplate.replace('%OriginStationId%',tt.originStationId);
    trainUrl = trainUrl.replace('%DestStationId%',tt.destStationId);
    trainUrl = trainUrl.replace('%HoursDeparture%',hours);
    trainUrl = trainUrl.replace('%MinutesDeparture%',minutes);
    trainUrl = trainUrl.replace('%GoingTrainCln%',date.yyyymmdd());
    //console.log('trainUrl:' ,trainUrl);
    return trainUrl;
}

// Find nearest station by position with Mongodb
function getNearestStationId(reqTT, cb){
    //console.log('getNearestStationId reqTT: ', reqTT);
    if (reqTT.originStationId) {
        setTimeout(function () {
          //console.log('Calling CB');
          cb(reqTT.originStationId);
        }, 0);
        return;
    }

      var colStations = dbConn.collection('stations');

      //console.log('lat: ',reqTT.lat ,' lng: ', reqTT.lng);
      colStations.find({"location":{$near:{$geometry:
          {type:"Point", coordinates:[reqTT.lat, reqTT.lng]}, $maxDistance:10000}}}).limit(1)
          .toArray().then(function(stations) {

              cb(stations[0].stationId);
      });

}
// Pull data from downloaded document
function getNextTrainTimestamp(strHtml){

    var $ = cheerio.load(strHtml);
    var rows = $('[name="TrainRow"]');
    var timesArray = [];

    for (var i = 0; i < rows.length; i++){
        // trainRowTime will look like: 11:15
        var trainRowTime = $(rows[i]).children('td').eq(1).text();

        // Push to results only future times
        if (Date.parse(timeStr2Timestamp(trainRowTime)) > new Date()){
            timesArray.push(Date.parse(timeStr2Timestamp(trainRowTime)));
        }
    }
    //console.log('timesArray ',timesArray);
    return timesArray;
}

