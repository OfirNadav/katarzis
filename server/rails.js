var cheerio     = require('cheerio'),
    request     = require('request'),
    config      = require('./config');

var activeCb;
var tt = {
    originStationId: null,
    destStationId: null,
    date: new Date(),
    nextTrains: []
};

module.exports.nextTrain = function (reqTT, cb){

    activeCb = cb;
    tt.originStationId = reqTT.originStationId;
    tt.destStationId = reqTT.destStationId;

    // console.log('tt: ', tt);

    var trainUrl = getTrainUrl(tt);

    download(trainUrl, getNextTrainTimestamp);
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

    var date = new Date(tt.date);
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
    // console.log('trainUrl:' ,trainUrl);
    return trainUrl;
}

// Pull data from downloaded document
function getNextTrainTimestamp(strHtml){

    var $ = cheerio.load(strHtml);
    var rows = $('[name="TrainRow"]');
    var timesArray = [];

    for (var i = 0; i < rows.length; i++){
        // trainRowTime will look like: 11:15
        var trainRowTime = $(rows[i]).find('.GridSortDateItemStyle').text();
        // Push to results only future times
        if (Date.parse(timeStr2Timestamp(trainRowTime)) > new Date()){
            timesArray.push(Date.parse(timeStr2Timestamp(trainRowTime)));
        }
    }
    // console.log('timesArray ',timesArray);

    if (timesArray.length){
        tt.nextTrains = timesArray;
        activeCb(null, tt);
    } else {
        var newDate = new Date(tt.date);
        tt.date = newDate.setHours(newDate.getHours() + 1);
        var trainUrl = getTrainUrl(tt);
        download(trainUrl, getNextTrainTimestamp);
    }

}

