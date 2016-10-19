(function(){
    "use strict";

    var app = angular.module('KatarZis.factories', ['toaster']);

    app.factory('TTFactory', function ($http, $window, UserFactory) {

        var cbtt = null;

        function buildReqTT(){
          return {
            originStationId: UserFactory.getCurrOriginStationId(),
            destStationId: UserFactory.getCurrDestStationId()
          };
        }

        function sendReq(req){
            //console.log('req: ', req);
            $http.post($window.location.origin + '/api/nextTrain', req)
            //$http.post('http://katarzis.co/api/nextTrain', req)
                .then(function(tt){
                    cbtt(tt)
                });
        }

        return {
            // find user position
            getTT: function (cb) {
                cbtt = cb;
                var reqTT = buildReqTT();
                if (reqTT.destStationId && reqTT.originStationId) sendReq(reqTT);
                else cbtt("אירעה שגיאה לא ידועה");

            }
        }
    });
})();






