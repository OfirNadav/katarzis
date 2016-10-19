//Handle station select from drop list
angular.module('selectStation', [])

.directive('selectStation', function (StationFactory, UserFactory) {
    return {
        restrict: 'EA',
        scope: {
            direction: '=',
            onStationChange: '&'
        },
        templateUrl: 'components/selectStation/stationSelect.html',
        link: function ($scope) {
            var ctrl = $scope;
            $scope.stations = StationFactory.query();
            var userFav = UserFactory.query();

            if (userFav.favoritesStations.length){
                var favStation2Shift = {
                    name: '------------------------------------',
                    stationId: null
                };
                ctrl.stations.unshift(favStation2Shift);
                for (var i = 0; i < Object.keys(userFav.favoritesStations).length; i++){
                    favStation2Shift = {};
                    favStation2Shift.name = StationFactory.get(userFav.favoritesStations[i].stationId).name;
                    favStation2Shift.stationId = userFav.favoritesStations[i].stationId;
                    ctrl.stations.unshift(favStation2Shift);
                }
            }

            ctrl.stations.unshift( {
                name: "בחר תחנת יעד",
                stationId: 0
            });

            $scope.$watch(function () {
                return ctrl.direction;
            }, function (newVal) {
                if (newVal === 'origin') {
                    ctrl.stations[0].name = 'בחר תחנת מוצא'
                } else if (newVal === 'dest') {
                    ctrl.stations[0].name = 'בחר תחנת יעד';
                }
            });

            $scope.stationId = $scope.stations[0].stationId;

            $scope.stationChanged = function () {
                ctrl.onStationChange({stationId:ctrl.stationId});
            }
        }
    }
});
