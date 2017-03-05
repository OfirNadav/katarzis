(function(){
    "use strict";

    angular.module('katarzis')
    .service('StationService', StationService);

    function StationService($http, $window, LocationService) {
        'ngInject';

        var stations = [
            {
                "name": "אופקים",
                "engName": "Ofakim",
                "stationId": "9700",
                "location": {
                    "lat": "31.413424",
                    "lng": "34.570997"
                }
            },
            {
                "name": "אשדוד עד הלום (ע״ש  בר כוכבא)",
                "engName": "Ashdod-Ad Halom (M.Bar Kochva)",
                "stationId": "5800",
                "location": {
                    "lat": "31.774082",
                    "lng": "34.666401"
                }
            },
            {
                "name": "אשקלון",
                "engName": "Ashkelon",
                "stationId": "5900",
                "location": {
                    "lat": "31.676846",
                    "lng": "34.604373"
                }
            },
            {
                "name": "באר יעקב",
                "engName": "Be'er Ya'akov",
                "stationId": "5300",
                "location": {
                    "lat": "31.932816",
                    "lng": "34.829041"
                }
            },
            {
                "name": "באר שבע-מרכז",
                "engName": "Be'er Sheva-Center",
                "stationId": "7320",
                "location": {
                    "lat": "31.242853",
                    "lng": "34.798453"
                }
            },
            {
                "name": "באר שבע-צפון/האוניברסיטה",
                "engName": "Be'er Sheva-North/University",
                "stationId": "7300",
                "location": {
                    "lat": "31.262128",
                    "lng": "34.809270"
                }
            },
            {
                "name": "בית יהושע",
                "engName": "Bet Yehoshu'a",
                "stationId": "3400",
                "location": {
                    "lat": "32.262343",
                    "lng": "34.860152"
                }
            },
            {
                "name": "בית שמש",
                "engName": "Bet Shemesh",
                "stationId": "6300",
                "location": {
                    "lat": "31.757867",
                    "lng": "34.989511"
                }
            },
            {
                "name": "בני ברק",
                "engName": "Bne Brak",
                "stationId": "4100",
                "location": {
                    "lat": "32.102911",
                    "lng": "34.830115"
                }
            },
            {
                "name": "בנימינה",
                "engName": "Binyamina",
                "stationId": "2800",
                "location": {
                    "lat": "32.514411",
                    "lng": "34.949637"
                }
            },
            {
                "name": "בת ים-יוספטל",
                "engName": "Bat Yam-Yoseftal",
                "stationId": "4680",
                "location": {
                    "lat": "32.014603",
                    "lng": "34.762020"
                }
            },
            {
                "name": "בת ים-קוממיות",
                "engName": "Bat Yam-Komemiyut",
                "stationId": "4690",
                "location": {
                    "lat": "32.001015",
                    "lng": "34.759342"
                }
            },
            {
                "name": "דימונה",
                "engName": "Dimona",
                "stationId": "7500",
                "location": {
                    "lat": "31.068564",
                    "lng": "35.011658"
                }
            },
            {
                "name": "הוד השרון-סוקולוב",
                "engName": "Hod HaSharon-Sokolov",
                "stationId": "9200",
                "location": {
                    "lat": "32.170198",
                    "lng": "34.901585"
                }
            },
            {
                "name": "הרצליה",
                "engName": "Hertsliya",
                "stationId": "3500",
                "location": {
                    "lat": "32.164020",
                    "lng": "34.818560"
                }
            },
            {
                "name": "חדרה-מערב",
                "engName": "Hadera-West",
                "stationId": "3100",
                "location": {
                    "lat": "32.438179",
                    "lng": "34.899337"
                }
            },
            {
                "name": "חולון-וולפסון",
                "engName": "Holon-Wolfson",
                "stationId": "4660",
                "location": {
                    "lat": "32.035509",
                    "lng": "34.759720"
                }
            },
            {
                "name": "חוצות המפרץ",
                "engName": "Hutsot HaMifrats",
                "stationId": "1300",
                "location": {
                    "lat": "32.807486",
                    "lng": "35.056146"
                }
            },
            {
                "name": "חיפה מרכז-השמונה",
                "engName": "Haifa Center-HaShmona",
                "stationId": "2100",
                "location": {
                    "lat": "32.822362",
                    "lng": "34.997216"
                }
            },
            {
                "name": "חיפה-בת גלים",
                "engName": "Haifa-Bat Galim",
                "stationId": "2200",
                "location": {
                    "lat": "32.830454",
                    "lng": "34.981889"
                }
            },
            {
                "name": "חיפה-חוף הכרמל (ע״ש רזיאל)",
                "engName": "Haifa-Hof HaKarmel (Razi`el)",
                "stationId": "2300",
                "location": {
                    "lat": "32.793507",
                    "lng": "34.957616"
                }
            },
            {
                "name": "יבנה-מזרח",
                "engName": "Yavne-East",
                "stationId": "5410",
                "location": {
                    "lat": "31.861650",
                    "lng": "34.744340"
                }
            },
            {
                "name": "יבנה-מערב",
                "engName": "Yavne-West",
                "stationId": "9000",
                "location": {
                    "lat": "31.891692",
                    "lng": "34.731509"
                }
            },
            {
                "name": 'ירושלים-גן החיות התנכ"י',
                "engName": "Jerusalem-Biblical Zoo",
                "stationId": "6500",
                "location": {
                    "lat": "31.745119",
                    "lng": "35.177192"
                }
            },
            {
                "name": "ירושלים-מלחה",
                "engName": "Jerusalem-Malha",
                "stationId": "6700",
                "location": {
                    "lat": "31.747784",
                    "lng": "35.188195"
                }
            },
            {
                "name": 'כפר חב"ד',
                "engName": "Kfar Habad",
                "stationId": "4800",
                "location": {
                    "lat": "31.993176",
                    "lng": "34.852947"
                }
            },
            {
                "name": "כפר סבא-נורדאו (ע״ש קוסטיוק)",
                "engName": "Kfar Sava-Nordau (A.Kostyuk)",
                "stationId": "8700",
                "location": {
                    "lat": "32.167334",
                    "lng": "34.917415"
                }
            },
            {
                "name": "לב המפרץ",
                "engName": "Lev HaMifrats",
                "stationId": "1220",
                "location": {
                    "lat": "32.793887",
                    "lng": "35.037101"
                }
            },
            {
                "name": "להבים-רהט",
                "engName": "Lehavim-Rahat",
                "stationId": "8550",
                "location": {
                    "lat": "31.369921",
                    "lng": "34.797977"
                }
            },
            {
                "name": "לוד",
                "engName": "Lod",
                "stationId": "5000",
                "location": {
                    "lat": "31.945283",
                    "lng": "34.875068"
                }
            },
            {
                "name": "לוד-גני אביב",
                "engName": "Lod-Gane Aviv",
                "stationId": "5150",
                "location": {
                    "lat": "31.966957",
                    "lng": "34.878750"
                }
            },
            {
                "name": "מודיעין-מרכז",
                "engName": "Modi'in-Center",
                "stationId": "400",
                "location": {
                    "lat": "31.901274",
                    "lng": "35.005639"
                }
            },
            {
                "name": "נהרייה",
                "engName": "Nahariya",
                "stationId": "1600",
                "location": {
                    "lat": "33.005084",
                    "lng": "35.098794"
                }
            },
            {
                "name": "נמל תעופה בן גוריון",
                "engName": "Ben Gurion Airport",
                "stationId": "8600",
                "location": {
                    "lat": "32.000330",
                    "lng": "34.870443"
                }
            },
            {
                "name": "נתיבות",
                "engName": "Netivot",
                "stationId": "9650",
                "location": {
                    "lat": "31.412375",
                    "lng": "34.571142"
                }
            },
            {
                "name": "נתניה",
                "engName": "Netanya",
                "stationId": "3300",
                "location": {
                    "lat": "32.319908",
                    "lng": "34.869298"
                }
            },
            {
                "name": "עכו",
                "engName": "Ako",
                "stationId": "1500",
                "location": {
                    "lat": "32.928361",
                    "lng": "35.083067"
                }
            },
            {
                "name": "עתלית",
                "engName": "Atlit",
                "stationId": "2500",
                "location": {
                    "lat": "32.692969",
                    "lng": "34.940262"
                }
            },
            {
                "name": "פאתי מודיעין",
                "engName": "Pa'ate Modi'in",
                "stationId": "300",
                "location": {
                    "lat": "31.893513",
                    "lng": "34.960728"
                }
            },
            {
                "name": "פתח תקווה-סגולה",
                "engName": "",
                "stationId": "4250",
                "location": {
                    "lat": "32.111848",
                    "lng": "34.901166"
                }
            },
            {
                "name": "פתח תקווה-קריית אריה",
                "engName": "Petah Tikva-Segula",
                "stationId": "4170",
                "location": {
                    "lat": "32.106334",
                    "lng": "34.863178"
                }
            },
            {
                "name": "צומת חולון",
                "engName": "Holon Junction",
                "stationId": "4640",
                "location": {
                    "lat": "32.037072",
                    "lng": "34.776441"
                }
            },
            {
                "name": "קיסריה-פרדס חנה",
                "engName": "Caesarea-Pardes Hana",
                "stationId": "2820",
                "location": {
                    "lat": "32.485209",
                    "lng": "34.954120"
                }
            },
            {
                "name": "קריית גת",
                "engName": "Kiryat Gat",
                "stationId": "7000",
                "location": {
                    "lat": "31.603529",
                    "lng": "34.777994"
                }
            },
            {
                "name": "קריית חיים",
                "engName": "Kiryat Hayim",
                "stationId": "700",
                "location": {
                    "lat": "32.824950",
                    "lng": "35.064223"
                }
            },
            {
                "name": "קריית מוצקין",
                "engName": "Kiryat Motzkin",
                "stationId": "800",
                "location": {
                    "lat": "32.833118",
                    "lng": "35.070086"
                }
            },
            {
                "name": "ראש העין-צפון",
                "engName": "Rosh Ha'Ayin-North",
                "stationId": "8800",
                "location": {
                    "lat": "32.120866",
                    "lng": "34.934495"
                }
            },
            {
                "name": "ראשון לציון-הראשונים",
                "engName": "Rishon LeTsiyon-HaRishonim",
                "stationId": "9100",
                "location": {
                    "lat": "31.949203",
                    "lng": "34.803376"
                }
            },{
                "name": "ראשון לציון-משה דיין",
                "engName": "Rishon LeTsiyon-Moshe Dayan",
                "stationId": "9800",
                "location": {
                    "lat": "31.987827",
                    "lng": "34.757406"
                }
            },
            {
                "name": "רחובות (ע״ש הדר)",
                "engName": "Rehovot (E. Hadar)",
                "stationId": "5200",
                "location": {
                    "lat": "31.908975",
                    "lng": "34.806312"
                }
            },
            {
                "name": "רמלה",
                "engName": "Ramla",
                "stationId": "5010",
                "location": {
                    "lat": "31.928788",
                    "lng": "34.877253"
                }
            },
            {
                "name": "שדרות",
                "engName": "Sderot",
                "stationId": "9600",
                "location": {
                    "lat": "31.515869",
                    "lng": "34.586018"
                }
            },
            {
                "name": 'ת"א-האוניברסיטה',
                "engName": "Tel Aviv-University",
                "stationId": "3600",
                "location": {
                    "lat": "32.103638",
                    "lng": "34.804663"
                }
            },
            {
                "name": 'ת"א-ההגנה',
                "engName": "Tel Aviv-HaHagana",
                "stationId": "4900",
                "location": {
                    "lat": "32.054137",
                    "lng": "34.784772"
                }
            },
            {
                "name": 'ת"א-השלום',
                "engName": "Tel Aviv-HaShalom",
                "stationId": "4600",
                "location": {
                    "lat": "32.073357",
                    "lng": "34.793203"
                }
            },
            {
                "name": 'ת"א-סבידור מרכז',
                "engName": "Tel Aviv-Savidor Center",
                "stationId": "3700",
                "location": {
                    "lat": "32.083734",
                    "lng": "34.798184"
                }
            }
        ];

        function getStations() {
            return angular.copy(stations);
        }

        function getStationById(stationId){
            if (!stationId) return;
            var station = stations.filter(function (val) {
                return val.stationId === stationId;
            });
            return station[0];
        }

        function getNearestOriginStation(pos) {
            var stations = getStations();
            var nearestStation = null;
            var minDistance = Number.MAX_VALUE;
            stations.forEach(function (station) {
                var DistInKm = LocationService.distance(station.location, pos);
                if (DistInKm < minDistance) {
                    minDistance = DistInKm;
                    nearestStation = station;
                }
            });
            return nearestStation;
        }

        function nextTrainsTimes(routes) {
            var timeArr =  routes.map(function (route) {
                var isPassDate = chackPassDate(route.Train[0].DepartureTime);
                if (!isPassDate) {
                    return dateStrToDateObj(route.Train[0].DepartureTime);
                }
            });

            return timeArr.filter(function (time) {
                return angular.isDefined(time);
            });
        }

        function chackPassDate(trainDate) {
            var now = new Date();
            return now > dateStrToDateObj(trainDate);
        }

        function dateStrToDateObj(dateStr) {
            var dateArr = dateStr.split(' ');
            var onlyDateArr = dateArr[0].split('/').reverse();
            var onlyTimeArr = dateArr[1].split(':');

            var fullDateArr = onlyDateArr.concat(onlyTimeArr);
            fullDateArr = fullDateArr.map(function (item) {
                return +item;
            });

            fullDateArr[1] = --fullDateArr[1];

            return new Date(fullDateArr[0], fullDateArr[1], fullDateArr[2], fullDateArr[3], fullDateArr[4], fullDateArr[5]);


        }

        function getDataFromRail(reqDrivePlan) {
            var urlApi = getTrainUrl(reqDrivePlan);
            return $.ajax({
                type: 'GET',
                url: urlApi,
                data: reqDrivePlan,
                dataType: 'json'
            });
        }

        function getNextTrains(reqDrivePlan) {
            var dataFromRailProm = getDataFromRail(reqDrivePlan);
            return dataFromRailProm.then(function (res) {
                var nextTrainsTimesArr =  nextTrainsTimes(res.Data.Routes);
                if (nextTrainsTimesArr) {
                    return nextTrainsTimesArr;
                } else {
                    var newDate = new Date(reqDrivePlan.date);
                    reqDrivePlan = newDate.setHours(newDate.getHours() + 1);
                    return getNextTrains(reqDrivePlan);
                }
            });
        }

        function getTrainUrl(reqDrivePlan) {
            var trainUrlTemplate = 'http://www.rail.co.il/apiinfo/api/Plan/GetRoutes?' +
                'OId=%OriginStationId%' +
                '&TId=%DestStationId%' +
                '&Date=%Date%' +
                '&Hour=%HoursDeparture%%MinutesDeparture%';

            var date = new Date(reqDrivePlan.date);

            // Hours part from the timestamp
            var hours = date.getHours().toString();
            hours = hours[1] ? hours : '0' + hours[0];

            // Minutes part from the timestamp
            var minutes = date.getMinutes().toString();
            minutes = minutes[1] ? minutes : '0' + minutes[0];

            var trainUrl = trainUrlTemplate.replace('%OriginStationId%',reqDrivePlan.originStationId);
            trainUrl = trainUrl.replace('%DestStationId%',reqDrivePlan.destStationId);
            trainUrl = trainUrl.replace('%HoursDeparture%',hours);
            trainUrl = trainUrl.replace('%MinutesDeparture%',minutes);
            trainUrl = trainUrl.replace('%Date%',date.yyyymmdd());

            // console.log('trainUrl:' ,trainUrl);
            return trainUrl;
        }

        // format the date as YYYYMMDD
        Date.prototype.yyyymmdd = function() {

            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
            var dd = this.getDate().toString();

            return yyyy + (mm[1]?mm:'0'+mm[0]) + (dd[1]?dd:'0'+dd[0]);
        };

        return {
            getStations: getStations,
            getStationById: getStationById,
            getNearestOriginStation: getNearestOriginStation,
            getNextTrains: getNextTrains
        }
    }
})();






