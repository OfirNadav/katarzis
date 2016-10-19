(function(){

    var myApp = angular.module('KatarZis.factories');

    myApp.factory('UserFactory', function () {

      var currDestStationId = null;
      var currOriginStationId = null;

// userInfo: {favoritesStations: [{stationId: 111, hour: 14}, ]}

// Load userInfo from localStorage
        function loadUserInfo() {
            if (localStorage.userInfo) return JSON.parse(localStorage.userInfo);
            else return {favoritesStations: []};
        }
// Save userInfo to localStorage
        function saveUserInfo(userInfo) {
            localStorage.userInfo = JSON.stringify(userInfo);
        }

        return {
// Save destStation to localStorage
            setDrivePlan: function (destStationId, originStationId) {
               var userInfo = loadUserInfo();
                currDestStationId = destStationId;
                currOriginStationId = originStationId;

                var favoritesStation = {
                    hour: new Date().getHours(),
                    stationId: destStationId
                };

                var foundDests = userInfo.favoritesStations.filter(function (favoritesStation) {
                    return favoritesStation.stationId === destStationId;
                });
                if (foundDests.length) {
                    foundDests[0].hour = favoritesStation.hour;
                } else {
                    userInfo.favoritesStations.push(favoritesStation);
                }
                saveUserInfo(userInfo);
            },
// functions used by tt-factory only
            getCurrDestStationId: function () {
                return currDestStationId;
            },
            getCurrOriginStationId: function () {
                return currOriginStationId;
            },

// Find the correct dest from localStorage
            getDestStation: function(originStationId){
                var userInfo = loadUserInfo();
                var hour = new Date().getHours();
                var foundStation = null;
                var minDiff  = Number.MAX_VALUE;

                [].forEach.call(userInfo.favoritesStations, function (favoritesStation) {
                    var m = Math.abs(hour - favoritesStation.hour);
                    if(m < minDiff && favoritesStation.stationId !== originStationId){
                        minDiff = m;
                        foundStation = favoritesStation;
                    }
                });
                return foundStation;
            },
            query: function () {
                return loadUserInfo();
            }
        }
    });
})();






