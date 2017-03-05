(function () {
    'use strict';
    angular.module('katarzis', ['selectStation', 'myModal'])

    .component('katarzisComponent', {
        bindings: {},
        templateUrl: 'katarzis/katarzis.template.html',
        controller: katarzisComponent,
        controllerAs: 'vm'
    });

    function katarzisComponent($scope, StationService, UserService, UtilsService, LocationService, $timeout, $q) {
        'ngInject';
        var vm = this;

        vm.tt = null;
        vm.error = "";
        vm.calculating = false;
        vm.newDrivePlan = true;
        vm.nextTrainTimes = null;
        vm.dir = 'dest';
        vm.originName = 'בחר תחנת מוצא';
        vm.destStationName = 'לאן נוסעים?';
        vm.reqTT = {};
        vm.showModal = false;

        vm.stations = StationService.getStations();
        vm.toggleModal = toggleModal;
        vm.getTrainInfo = getTrainInfo;
        vm.openSelect = openSelect;
        vm.stationChanged = stationChanged;
        vm.wipeFavStations = wipeFavStations;

        autoDrivePlanCalc();

        function wipeFavStations(){
            if (localStorage.userInfo) delete localStorage.userInfo;
            UtilsService.pop('הכל נקי נשמה');
        }

        function toggleModal(){
            vm.showModal = !vm.showModal;
        }

        // Automated DrivePlan Calculation
        function autoDrivePlanCalc (){
            $q.all([
                calcNearestOriginStation(),
                setDestStation()
            ]).then(getTrainInfo);
        }

        function calcNearestOriginStation() {
            return LocationService.getGeolocation().then(function (pos) {
                if (typeof pos !== 'object'){
                    vm.originName = 'בחר תחנת מוצא';
                    vm.isDestShown = false;
                    vm.dir = 'origin';
                    vm.isOriginShown = true;
                    vm.calculating = false;
                    vm.newDrivePlan = true;
                    // TODO: check with yaron. won't binding without $apply().
                    UtilsService.pop(pos);
                    $scope.$apply();
                } else {
                    var nearestOriginStation = StationService.getNearestOriginStation(pos);
                    vm.reqTT.originStationId = nearestOriginStation.stationId;
                    vm.originName = nearestOriginStation.name;
                    vm.originName += ' (לפי מיקום נוכחי) ';
                    $scope.$apply();
                }
            });
        }

        // Place destination station from local storage
        function setDestStation(){
            return new Promise(function (resolve, reject) {
                var destStation = UserService.getDestStation(vm.reqTT.originStationId);
                if (destStation) {
                    vm.destStationName = StationService.getStationById(destStation.stationId).name;
                    vm.reqTT.destStationId = destStation.stationId;
                    resolve('ok');
                } else {
                    vm.newDrivePlan = true;
                    vm.isDestShown = true;
                    reject('err');
                }
            });
        }

        // Check localStorage for userInfo
        function checkValidation() {
            if (!vm.reqTT.destStationId || vm.reqTT.destStationId === vm.reqTT.originStationId) {
                UtilsService.pop('אנא בחר תחנת יעד');
                return false;
            }
            if (!vm.reqTT.originStationId || vm.reqTT.destStationId === vm.reqTT.originStationId) {
                UtilsService.pop('אנא בחר תחנת מוצא');
                return false;
            }
            if (vm.calculating) {
                UtilsService.pop('סבלנות כפרה');
                return false;
            }
            return true;
        }


        //MAIN FUNCTION - return the next trains time
        function getTrainInfo() {
            if (!checkValidation()) {
                return;
            }

            UserService.saveDrivePlan(vm.reqTT);
            $timeout(function () {
                vm.isOriginShown = false;
                vm.isDestShown = false;
                vm.calculating = true;
            });

            vm.reqTT.date = new Date();

            StationService.getNextTrains(vm.reqTT).then(function (res) {
                if (!vm.calculating) return;
                // check the respond for error or data
                var nextTrains = res;
                if (nextTrains){
                    vm.nextTrainTimes = UtilsService.countDownTimer(nextTrains);

                    vm.originName = StationService.getStationById(vm.reqTT.originStationId).name;
                    vm.calculating = false;
                    vm.newDrivePlan = false;
                }
                else {
                    $timeout(function () {
                        //console.log('error res: ', res);
                        vm.originName = 'בחר תחנת מוצא';
                        vm.calculating = false;
                        vm.newDrivePlan = true;
                        UtilsService.pop(res);
                    });
                }
            });
        }

        // Open select-stations for Origin OR Dest
        function openSelect(direction) {
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

        // Change the station name & id to selected
        function stationChanged(stationId) {
            if (vm.dir === 'origin'){
                vm.isOriginShown = false;
                if (!stationId) return;
                vm.originName = StationService.getStationById(stationId).name;
                vm.reqTT.originStationId = stationId;

            } else {
                vm.isDestShown = false;
                if (!stationId) return;
                vm.destStationName = StationService.getStationById(stationId).name;
                vm.reqTT.destStationId = stationId;

            }
        }
    }
}());