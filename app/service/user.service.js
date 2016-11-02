(function(){

    var app = angular.module('UserService', []);

    app.service('UserService', UserService);

    function UserService() {
      'ngInject';

      var currDestStationId = null;
      var currOriginStationId = null;

      // EX: - userInfo: {favoritesStations: [{stationId: 111, hour: 14}, ]}

      // Load userInfo from localStorage
      function loadUserInfo() {
        if (localStorage.userInfo) return JSON.parse(localStorage.userInfo);
        else return {favoritesStations: []};
      }

      // Save userInfo to localStorage
      function saveUserInfo(userInfo) {
        localStorage.userInfo = JSON.stringify(userInfo);
      }

      // Save destStation to localStorage
      function saveDrivePlan(drivePlan) {
        var userInfo = loadUserInfo();
        currDestStationId = drivePlan.destStationId;
        currOriginStationId = drivePlan.originStationId;

        var favoritesStation = {
          hour: new Date().getHours(),
          stationId: drivePlan.destStationId
        };

        var foundDests = userInfo.favoritesStations.filter(function (favoritesStation) {
          return favoritesStation.stationId === drivePlan.destStationId;
        });
        if (foundDests.length) {
          foundDests[0].hour = favoritesStation.hour;
        } else {
          userInfo.favoritesStations.push(favoritesStation);
        }
        saveUserInfo(userInfo);
      }

      // functions used by tt-factory only
      function getCurrDestStationId() {
        return currDestStationId;
      }

      function getCurrOriginStationId() {
        return currOriginStationId;
      }

      // Find the correct dest from localStorage
      function getDestStation(originStationId){
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
      }

      return {

        saveDrivePlan: saveDrivePlan,
        getCurrDestStationId: getCurrDestStationId,
        getCurrOriginStationId: getCurrOriginStationId,
        getDestStation: getDestStation,
        query: loadUserInfo
      }
    }
})();






