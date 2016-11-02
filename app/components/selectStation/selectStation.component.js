(function () {
    'use strict';
    var app = angular.module('selectStation', []);

    app.component('selectStation', {
        bindings: {
            direction: '=',
            onStationChange: '&'
        },
        templateUrl: 'components/selectStation/stationSelect.template.html',
        controller: selectStationComponent,
        controllerAs: 'vm'
    });

    function selectStationComponent($scope, StationService, UserService) {
        'ngInject';
        var vm = this;
        vm.stations = StationService.getStations();
        var userFav = UserService.query();

        if (userFav.favoritesStations.length){
            var favStation2Shift = {
                name: '------------------------------------',
                stationId: null
            };
            vm.stations.unshift(favStation2Shift);
            for (var i = 0; i < Object.keys(userFav.favoritesStations).length; i++){
                favStation2Shift = {};
                favStation2Shift.name = StationService.getStationById(userFav.favoritesStations[i].stationId).name;
                favStation2Shift.stationId = userFav.favoritesStations[i].stationId;
                vm.stations.unshift(favStation2Shift);
            }
        }

        vm.stations.unshift( {
            name: "בחר תחנת יעד",
            stationId: 0
        });

        $scope.$watch(function () {
            return vm.direction;
        }, function (newVal) {
            if (newVal === 'origin') {
                vm.stations[0].name = 'בחר תחנת מוצא'
            } else if (newVal === 'dest') {
                vm.stations[0].name = 'בחר תחנת יעד';
            }
        });

        vm.stationId = vm.stations[0].stationId;

        vm.stationChanged = function () {
            vm.onStationChange({stationId:vm.stationId});
        }
    }
}());