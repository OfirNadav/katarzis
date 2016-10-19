(function () {
  'use strict';
  var app = angular.module('KatarZis.home', ['ionic', 'selectStation', 'myModal']);

  app.controller('HomeCtrl', HomeCtrl);
  HomeCtrl.$inject = ['$scope', 'TTFactory', 'StationFactory', 'UserFactory', 'UtilsFactory', 'LocationFactory'];

  function HomeCtrl($scope, TTFactory, StationFactory, UserFactory, UtilsFactory, LocationFactory) {
    var vm = this;

    vm.tt = null;
    vm.error = "";
    vm.calculating = false;
    vm.newDrivePlan = true;
    vm.nextTrainTimes = null;
    vm.originName = 'מיקום נוכחי (תחנה קרובה)';
    vm.dir = 'dest';
    vm.destStationName = 'לאן נוסעים?';
    vm.reqTT = {};
    vm.showModal = false;

    // Return all station
    vm.stations = StationFactory.query();
    vm.toggleModal = toggleModal;
    vm.getGeolocation = getGeolocation;
    vm.placeDestStation = placeDestStation;
    vm.getTrainInfo = getTrainInfo;
    vm.changeStation = changeStation;
    vm.stationChanged = stationChanged;
    vm.wipeFavStations = wipeFavStations;
    vm.getTT = getTT;
    vm.autoDrivePlanCalc = autoDrivePlanCalc();

    function wipeFavStations(){
      if (localStorage.userInfo) delete localStorage.userInfo;
      UtilsFactory.pop('הכל נקי נשמה');
    }

    function toggleModal(){
      console.log('here');
      vm.showModal = !vm.showModal;
    }

    // Automated DrivePlan Calculation
    function autoDrivePlanCalc (){
          vm.originName = 'מיקום נוכחי (תחנה קרובה)';
          vm.getGeolocation();
    }

    // Get location and calculate nearest origin station
    function getGeolocation(){
      LocationFactory.getGeolocation(function (pos) {
        if (typeof pos !== 'object'){
          vm.originName = 'בחר תחנת מוצא';
          vm.isDestShown = false;
          vm.dir = 'origin';
          vm.isOriginShown = true;
          vm.calculating = false;
          vm.newDrivePlan = true;
          // TODO: check with yaron. won't binding without $digest().
          UtilsFactory.pop(pos);
          $scope.$digest();
        } else {
          vm.reqTT.originStationId = pos.data;
          vm.originName = StationFactory.get(pos.data).name;
          vm.originName += ' (לפי מיקום נוכחי) ';
          vm.placeDestStation();
        }
      });
    }

    // Place destination station from local storage
    function placeDestStation(){
        var destStation = UserFactory.getDestStation(vm.reqTT.originStationId);
        if (destStation) {
            vm.destStationName = StationFactory.get(destStation.stationId).name;
            vm.reqTT.destStationId = destStation.stationId;
            vm.getTrainInfo();
        } else {
          vm.newDrivePlan = true;
          vm.isDestShown = true;
        }
    }

    // Check localStorage for userInfo
    function getTrainInfo() {
      if (!vm.reqTT.destStationId || vm.reqTT.destStationId === vm.reqTT.originStationId) {
        UtilsFactory.pop('אנא בחר תחנת יעד');
        return;
      }
      if (vm.calculating) {
        UtilsFactory.pop('סבלנות כפרה');
        return;
      }

      UserFactory.setDrivePlan(vm.reqTT.destStationId, vm.reqTT.originStationId);
      vm.isOriginShown = false;
      vm.isDestShown = false;
      vm.calculating = true;
      vm.getTT();
    }


    // Open select-stations for Origin OR Dest
    function changeStation(direction) {
        vm.dir = direction;
        if (direction === 'origin'){
            vm.isOriginShown = true;
            vm.isDestShown = false;
        } else {
            vm.isDestShown = true;
            vm.isOriginShown = false;
        }
        vm.calculating = false;
        vm.newDrivePlan = true;
    }

    //MAIN FUNCTION - return the next trains time
    function getTT() {
        TTFactory.getTT(function (res) {
            if (!vm.calculating) return;
            // check the respond for error or data
            if (res.data){
              //console.log('res.data: ', res.data);
                vm.tt = res.data;
                if (vm.tt.nextTrains.length){
                    vm.nextTrainTimes = UtilsFactory.countDownTimer(vm.tt.nextTrains);
                }  // else console.log('Train not found');

                vm.originName = StationFactory.get(vm.tt.originStationId).name;
                vm.calculating = false;
                vm.newDrivePlan = false;
            }
            else {
                //console.log('error res: ', res);
                vm.originName = 'בחר תחנת מוצא';
                vm.calculating = false;
                vm.newDrivePlan = true;
             // TODO: check with yaron. won't binding without $digest().
                UtilsFactory.pop(res);
                $scope.$digest();
            }
        });
    }

    // Change the station name & id to selected
    function stationChanged(stationId) {
        if (vm.dir === 'origin'){
            vm.isOriginShown = false;
            if (!stationId) return;
            vm.originName = StationFactory.get(stationId).name;
            vm.reqTT.originStationId = stationId;

        } else {
            vm.isDestShown = false;
            if (!stationId) return;
            vm.destStationName = StationFactory.get(stationId).name;
            vm.reqTT.destStationId = stationId;

        }
    }
  }

})();

