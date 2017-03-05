(function(){

    angular.module('katarzis')
    .service('LocationService', LocationService);

    function LocationService() {
      'ngInject';

      var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };

      function getGeolocation() {
        if (navigator.geolocation) {
          return new Promise(function (resolve, reject) {
            navigator.geolocation.watchPosition(posSuccess, handleError, options);

            function posSuccess(position) {
              resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
            }

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

              reject(err);
            }
          });
        }
        else {
          console.error('Geolocation is not supported by this browser.');
          reject('מיקום גיאוגרפי אינו נתמך על ידי דפדפן זה');
        }
      }

      function degrees2Radians(){
        /** Converts numeric degrees to radians */
        if (typeof(Number.prototype.toRad) === "undefined") {
          Number.prototype.toRad = function () {
            return this * Math.PI / 180;
          }
        }
      }

      function distance(origin, dest) {
        degrees2Radians();
        origin.lat = +origin.lat;
        origin.lng = +origin.lng;
        dest.lat = +dest.lat;
        dest.lng = +dest.lng;
        var R = 6371; // Radius of the earth in km
        var dLat = (dest.lat - origin.lat).toRad();  // Javascript functions in radians
        var dLng = (dest.lng - origin.lng).toRad();
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(origin.lat.toRad()) * Math.cos(dest.lat.toRad()) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
      }

        return {
          getGeolocation: getGeolocation,
          distance: distance
        }
    }
})();






