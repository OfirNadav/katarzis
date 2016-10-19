(function(){

    var app = angular.module('KatarZis.factories');

    app.factory('LocationFactory', function ($http, UserFactory) {

      var cbtt = null;
      var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };

      function buildReqTT(){
        return {
          originStationId: UserFactory.getCurrOriginStationId(),
          destStationId: UserFactory.getCurrDestStationId()
        };
      }

      //handle error geolocation func
      function handleError (error) {
        var err;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            //err = "User denied the request for Geolocation.";
            err = "לשימוש אופטימלי אנא הפעל שירותי מיקום";
            break;
          case error.POSITION_UNAVAILABLE:
            //err = "Location information is unavailable.";
            err = "מיקום אינו זמין";
            break;
          case error.TIMEOUT:
            //err = "The request to get user location timed out.";
            err = "הבקשה לקבלת מיקום משתמש פגה";
            break;
          case error.UNKNOWN_ERROR:
            //err = "An unknown error occurred.";
            err = "אירעה שגיאה לא ידועה";
            break;
        }
        var reqTT = buildReqTT();
        if (reqTT.destStationId && reqTT.originStationId) sendReq(reqTT);
        else cbtt(err);
      }

      function currPosSuccess(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var reqTT = buildReqTT();

        reqTT.lat = lat;
        reqTT.lng = lng;

        //cbtt(reqTT);
        sendReq(reqTT);
      }

      function sendReq(req){
        //console.log('req: ', req);
        $http.post('/api/originStation', req)
          //$http.post('http://katarzis.co/api/nextTrain', req)
          .then(function(nearestStationId){
            cbtt(nearestStationId)
          });
      }

        return {
          // find user position
          getGeolocation: function (cb) {
            cbtt = cb;
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(currPosSuccess, handleError, options);
            }
            else {
              //return "Geolocation is not supported by this browser.";
              return "מיקום גיאוגרפי אינו נתמך על ידי דפדפן זה";
            }
          }
        }
    });
})();






