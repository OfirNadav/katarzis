(function(){

    var myApp = angular.module('KatarZis.factories');

    myApp.factory('UtilsFactory', function ($interval, toaster) {

      var intervalID;
      var canvas, context, x, y = true;

      function stopInterval(){
        $interval.cancel(intervalID);
        readyCanvas();
      }

      function readyCanvas(){
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        x = canvas.width / 2;
        y = canvas.height / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      function updateTimeParts(nextTrainTimes) {
        var days, hours, minutes, seconds;
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = ((nextTrainTimes.targetDate - current_date) / 1000) + 2;

        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;

        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;

        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        nextTrainTimes.date.hours = hours;
        nextTrainTimes.date.minutes = minutes;
        nextTrainTimes.date.seconds = seconds;
      }

        return {

          countDownTimer: function (timesArray) {

            if (!timesArray.length) return;
            //console.log('timesArray: ', timesArray);

            var nextTrainTimes = {date: {}, next: null};
            nextTrainTimes.curr = timesArray[0];
            nextTrainTimes.targetDate = new Date(timesArray[0]).getTime();
            if (timesArray[1]) nextTrainTimes.next = timesArray[1];
            updateTimeParts(nextTrainTimes);

            var currentEndAngle = 0,
              currentStartAngle = 0,
              currentColor = '#4A4852',
              lineRadius = 100,
              lineWidth = 10;

            readyCanvas();
            countDown();

            function draw() {

              var radius;
              var width;

              var startAngle = currentStartAngle * Math.PI;
              var endAngle = currentEndAngle * Math.PI;

              currentStartAngle = currentEndAngle;
              //currentStartAngle = currentEndAngle - 0.033333;
              currentEndAngle = currentEndAngle + 0.033333;

              radius = lineRadius;
              width = lineWidth;

              if (Math.floor(currentStartAngle / 2) % 2) {
                currentColor = "#4A4852";
                width = lineWidth + 2;
              } else {
                currentColor = "#72ECB5";
              }

              var counterClockwise = false;
              context.beginPath();
              context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
              context.lineWidth = width;
              context.strokeStyle = currentColor;
              context.stroke();
            }

            function countDown() {
              stopInterval();
              nextTrainTimes.targetDate = new Date(timesArray[0]).getTime();


              intervalID = $interval(function () {
                if (nextTrainTimes.date.minutes <= 0) {
                  timesArray.shift();

                  if (timesArray[0]) {
                    nextTrainTimes.curr = timesArray[0];
                    nextTrainTimes.targetDate = new Date(timesArray[0]).getTime();

                    if (timesArray[1]) nextTrainTimes.next = timesArray[1];
                    else nextTrainTimes.next = null;
                  } else {
                    nextTrainTimes.date = null;
                    stopInterval();
                    return;
                  }
                }

                updateTimeParts(nextTrainTimes);

                draw();
              }, 1000);
            }
            return nextTrainTimes;
          },

          pop: function (msg) {
            //toaster.pop('error', msg, null, null);
            toaster.pop('info', msg, null, null);
          }
        }
    });
})();






