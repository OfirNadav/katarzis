(function(){
    "use strict";

    var app = angular.module('KatarZis.factories');

    app.factory('StationFactory', function () {

        var stations = [
           {
                "name": "אופקים",
                "engName": "Ofakim",
                "stationId": "9700",
                "location": {
                    "latitude": "31.413424",
                    "longitude": "34.570997"
                }
            },
            {
                "name": "אשדוד עד הלום (ע״ש  בר כוכבא)",
                "engName": "Ashdod-Ad Halom (M.Bar Kochva)",
                "stationId": "5800",
                "location": {
                    "latitude": "31.774082",
                    "longitude": "34.666401"
                }
            },
            {
                "name": "אשקלון",
                "engName": "Ashkelon",
                "stationId": "5900",
                "location": {
                    "latitude": "31.676846",
                    "longitude": "34.604373"
                }
            },
            {
                "name": "באר יעקב",
                "engName": "Be'er Ya'akov",
                "stationId": "5300",
                "location": {
                    "latitude": "31.932816",
                    "longitude": "34.829041"
                }
            },
            {
                "name": "באר שבע-מרכז",
                "engName": "Be'er Sheva-Center",
                "stationId": "7320",
                "location": {
                    "latitude": "31.242853",
                    "longitude": "34.798453"
                }
            },
            {
                "name": "באר שבע-צפון/האוניברסיטה",
                "engName": "Be'er Sheva-North/University",
                "stationId": "7300",
                "location": {
                    "latitude": "31.262128",
                    "longitude": "34.809270"
                }
            },
            {
                "name": "בית יהושע",
                "engName": "Bet Yehoshu'a",
                "stationId": "3400",
                "location": {
                    "latitude": "32.262343",
                    "longitude": "34.860152"
                }
            },
            {
                "name": "בית שמש",
                "engName": "Bet Shemesh",
                "stationId": "6300",
                "location": {
                    "latitude": "31.757867",
                    "longitude": "34.989511"
                }
            },
            {
                "name": "בני ברק",
                "engName": "Bne Brak",
                "stationId": "4100",
                "location": {
                    "latitude": "32.102911",
                    "longitude": "34.830115"
                }
            },
            {
                "name": "בנימינה",
                "engName": "Binyamina",
                "stationId": "2800",
                "location": {
                    "latitude": "32.514411",
                    "longitude": "34.949637"
                }
            },
            {
                "name": "בת ים-יוספטל",
                "engName": "Bat Yam-Yoseftal",
                "stationId": "4680",
                "location": {
                    "latitude": "32.014603",
                    "longitude": "34.762020"
                }
            },
            {
                "name": "בת ים-קוממיות",
                "engName": "Bat Yam-Komemiyut",
                "stationId": "4690",
                "location": {
                    "latitude": "32.001015",
                    "longitude": "34.759342"
                }
            },
            {
                "name": "דימונה",
                "engName": "Dimona",
                "stationId": "7500",
                "location": {
                    "latitude": "31.068564",
                    "longitude": "35.011658"
                }
            },
            {
                "name": "הוד השרון-סוקולוב",
                "engName": "Hod HaSharon-Sokolov",
                "stationId": "9200",
                "location": {
                    "latitude": "32.170198",
                    "longitude": "34.901585"
                }
            },
            {
                "name": "הרצליה",
                "engName": "Hertsliya",
                "stationId": "3500",
                "location": {
                    "latitude": "32.164020",
                    "longitude": "34.818560"
                }
            },
            {
                "name": "חדרה-מערב",
                "engName": "Hadera-West",
                "stationId": "3100",
                "location": {
                    "latitude": "32.438179",
                    "longitude": "34.899337"
                }
            },
            {
                "name": "חולון-וולפסון",
                "engName": "Holon-Wolfson",
                "stationId": "4660",
                "location": {
                    "latitude": "32.035509",
                    "longitude": "34.759720"
                }
            },
            {
                "name": "חוצות המפרץ",
                "engName": "Hutsot HaMifrats",
                "stationId": "1300",
                "location": {
                    "latitude": "32.807486",
                    "longitude": "35.056146"
                }
            },
            {
                "name": "חיפה מרכז-השמונה",
                "engName": "Haifa Center-HaShmona",
                "stationId": "2100",
                "location": {
                    "latitude": "32.822362",
                    "longitude": "34.997216"
                }
            },
            {
                "name": "חיפה-בת גלים",
                "engName": "Haifa-Bat Galim",
                "stationId": "2200",
                "location": {
                    "latitude": "32.830454",
                    "longitude": "34.981889"
                }
            },
            {
                "name": "חיפה-חוף הכרמל (ע״ש רזיאל)",
                "engName": "Haifa-Hof HaKarmel (Razi`el)",
                "stationId": "2300",
                "location": {
                    "latitude": "32.793507",
                    "longitude": "34.957616"
                }
            },
            {
                "name": "יבנה-מזרח",
                "engName": "Yavne-East",
                "stationId": "5410",
                "location": {
                    "latitude": "31.861650",
                    "longitude": "34.744340"
                }
            },
            {
                "name": "יבנה-מערב",
                "engName": "Yavne-West",
                "stationId": "9000",
                "location": {
                    "latitude": "31.891692",
                    "longitude": "34.731509"
                }
            },
            {
                "name": 'ירושלים-גן החיות התנכ"י',
                "engName": "Jerusalem-Biblical Zoo",
                "stationId": "6500",
                "location": {
                    "latitude": "31.745119",
                    "longitude": "35.177192"
                }
            },
            {
                "name": "ירושלים-מלחה",
                "engName": "Jerusalem-Malha",
                "stationId": "6700",
                "location": {
                    "latitude": "31.747784",
                    "longitude": "35.188195"
                }
            },
            {
                "name": 'כפר חב"ד',
                "engName": "Kfar Habad",
                "stationId": "4800",
                "location": {
                    "latitude": "31.993176",
                    "longitude": "34.852947"
                }
            },
            {
                "name": "כפר סבא-נורדאו (ע״ש קוסטיוק)",
                "engName": "Kfar Sava-Nordau (A.Kostyuk)",
                "stationId": "8700",
                "location": {
                    "latitude": "32.167334",
                    "longitude": "34.917415"
                }
            },
            {
                "name": "לב המפרץ",
                "engName": "Lev HaMifrats",
                "stationId": "1220",
                "location": {
                    "latitude": "32.793887",
                    "longitude": "35.037101"
                }
            },
            {
                "name": "להבים-רהט",
                "engName": "Lehavim-Rahat",
                "stationId": "8550",
                "location": {
                    "latitude": "31.369921",
                    "longitude": "34.797977"
                }
            },
            {
                "name": "לוד",
                "engName": "Lod",
                "stationId": "5000",
                "location": {
                    "latitude": "31.945283",
                    "longitude": "34.875068"
                }
            },
            {
                "name": "לוד-גני אביב",
                "engName": "Lod-Gane Aviv",
                "stationId": "5150",
                "location": {
                    "latitude": "31.966957",
                    "longitude": "34.878750"
                }
            },
            {
                "name": "מודיעין-מרכז",
                "engName": "Modi'in-Center",
                "stationId": "400",
                "location": {
                    "latitude": "31.901274",
                    "longitude": "35.005639"
                }
            },
            {
                "name": "נהרייה",
                "engName": "Nahariya",
                "stationId": "1600",
                "location": {
                    "latitude": "33.005084",
                    "longitude": "35.098794"
                }
            },
            {
                "name": "נמל תעופה בן גוריון",
                "engName": "Ben Gurion Airport",
                "stationId": "8600",
                "location": {
                    "latitude": "32.000330",
                    "longitude": "34.870443"
                }
            },
            {
                "name": "נתיבות",
                "engName": "Netivot",
                "stationId": "9650",
                "location": {
                    "latitude": "31.412375",
                    "longitude": "34.571142"
                }
            },
            {
                "name": "נתניה",
                "engName": "Netanya",
                "stationId": "3300",
                "location": {
                    "latitude": "32.319908",
                    "longitude": "34.869298"
                }
            },
            {
                "name": "עכו",
                "engName": "Ako",
                "stationId": "1500",
                "location": {
                    "latitude": "32.928361",
                    "longitude": "35.083067"
                }
            },
            {
                "name": "עתלית",
                "engName": "Atlit",
                "stationId": "2500",
                "location": {
                    "latitude": "32.692969",
                    "longitude": "34.940262"
                }
            },
            {
                "name": "פאתי מודיעין",
                "engName": "Pa'ate Modi'in",
                "stationId": "300",
                "location": {
                    "latitude": "31.893513",
                    "longitude": "34.960728"
                }
            },
            {
                "name": "פתח תקווה-סגולה",
                "engName": "",
                "stationId": "4250",
                "location": {
                    "latitude": "32.111848",
                    "longitude": "34.901166"
                }
            },
            {
                "name": "פתח תקווה-קריית אריה",
                "engName": "Petah Tikva-Segula",
                "stationId": "4170",
                "location": {
                    "latitude": "32.106334",
                    "longitude": "34.863178"
                }
            },
            {
                "name": "צומת חולון",
                "engName": "Holon Junction",
                "stationId": "4640",
                "location": {
                    "latitude": "32.037072",
                    "longitude": "34.776441"
                }
            },
            {
                "name": "קיסריה-פרדס חנה",
                "engName": "Caesarea-Pardes Hana",
                "stationId": "2820",
                "location": {
                    "latitude": "32.485209",
                    "longitude": "34.954120"
                }
            },
            {
                "name": "קריית גת",
                "engName": "Kiryat Gat",
                "stationId": "7000",
                "location": {
                    "latitude": "31.603529",
                    "longitude": "34.777994"
                }
            },
            {
                "name": "קריית חיים",
                "engName": "Kiryat Hayim",
                "stationId": "700",
                "location": {
                    "latitude": "32.824950",
                    "longitude": "35.064223"
                }
            },
            {
                "name": "קריית מוצקין",
                "engName": "Kiryat Motzkin",
                "stationId": "800",
                "location": {
                    "latitude": "32.833118",
                    "longitude": "35.070086"
                }
            },
            {
                "name": "ראש העין-צפון",
                "engName": "Rosh Ha'Ayin-North",
                "stationId": "8800",
                "location": {
                    "latitude": "32.120866",
                    "longitude": "34.934495"
                }
            },
            {
                "name": "ראשון לציון-הראשונים",
                "engName": "Rishon LeTsiyon-HaRishonim",
                "stationId": "9100",
                "location": {
                    "latitude": "31.949203",
                    "longitude": "34.803376"
                }
            },{
                "name": "ראשון לציון-משה דיין",
                "engName": "Rishon LeTsiyon-Moshe Dayan",
                "stationId": "9800",
                "location": {
                    "latitude": "31.987827",
                    "longitude": "34.757406"
                }
            },
            {
                "name": "רחובות (ע״ש הדר)",
                "engName": "Rehovot (E. Hadar)",
                "stationId": "5200",
                "location": {
                    "latitude": "31.908975",
                    "longitude": "34.806312"
                }
            },
            {
                "name": "רמלה",
                "engName": "Ramla",
                "stationId": "5010",
                "location": {
                    "latitude": "31.928788",
                    "longitude": "34.877253"
                }
            },
            {
                "name": "שדרות",
                "engName": "Sderot",
                "stationId": "9600",
                "location": {
                    "latitude": "31.515869",
                    "longitude": "34.586018"
                }
            },
            {
                "name": 'ת"א-האוניברסיטה',
                "engName": "Tel Aviv-University",
                "stationId": "3600",
                "location": {
                    "latitude": "32.103638",
                    "longitude": "34.804663"
                }
            },
            {
                "name": 'ת"א-ההגנה',
                "engName": "Tel Aviv-HaHagana",
                "stationId": "4900",
                "location": {
                    "latitude": "32.054137",
                    "longitude": "34.784772"
                }
            },
            {
                "name": 'ת"א-השלום',
                "engName": "Tel Aviv-HaShalom",
                "stationId": "4600",
                "location": {
                    "latitude": "32.073357",
                    "longitude": "34.793203"
                }
            },
            {
                "name": 'ת"א-סבידור מרכז',
                "engName": "Tel Aviv-Savidor Center",
                "stationId": "3700",
                "location": {
                    "latitude": "32.083734",
                    "longitude": "34.798184"
                }
            }
        ];
    
        function query() {
            return angular.copy(stations);
        }
        
        function getStationById(stationId){
            if (!stationId) return;
            var station = stations.filter(function (val) {
                return val.stationId === stationId;
            });
            return station[0];
        }
        
        return {
            query: query,
            getStationById: getStationById
        }
        });
})();






