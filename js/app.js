(function () {
    var app = angular.module('KatarZis',
        [
            'toaster',
            'myModal',
            'selectStation',
            'KatarZis.home',
            'KatarZis.factories'
        ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/home.html",
                controller: "HomeCtrl as vm"
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });

    app.run(function() {
        addToHomescreen();
    });
})();
