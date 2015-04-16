var app = angular.module('myApp', []);

app.service("appService", function ($http, $q){
  var deferred = $q.defer();
  $http.get('Sample Data.csv').then(function (response){
    var data = $.csv.toArrays(response.data);
    deferred.resolve(data);
  });

  this.getData = function (){
    return deferred.promise;
  }
})

.controller('GraphCtrl', function ($scope, appService) {
  $scope.currentDay = new Date('7/31/2014');
  //note: getMonth() starts at 0, not 1!
  $scope.dayXaxis = ['x', $scope.currentDay.getFullYear()+'-'+($scope.currentDay.getMonth()+1)+'-'+$scope.currentDay.getDate()];
  $scope.ratio = 0;
  $scope.mobile = 0;
  $scope.tablet = 0;
  $scope.desktop = 0;
  $scope.male = 0;
  $scope.female = 0;


  $scope.showGraph = function() {
  var promise = appService.getData();
  promise.then(function (data){
    data.shift();
    $scope.dataset = data;
    console.log($scope.dataset);

    //data manipulation
    var newData = $scope.dataset;
    // var newArr = [];
    // for(var i = 0; i < newData.length; i++){
    //   var accessNum = parseInt(newData[i][4]);
    //   newArr.push(accessNum);
    // }

    $scope.chart = null;
      $scope.chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
            //xFormat: '%Y%m%d'
          columns: [
             $scope.dayXaxis,
             ['ratio', .20]
          ]
        },
        axis: {
          x: {
              type: 'timeseries',
              tick: {
                  format: '%m-%d-%Y'
              }
          }
        }
      });

  $scope.dayRatio = function() {
    var data = $scope.dataset;
    var totalCount = 0;
    var totalOnes = 0;
    for(var i = 0; i < data.length; i++){
      var day = data[i];
      if(new Date(day[0]).getTime() === $scope.currentDay.getTime()){
        totalCount++;
        totalOnes += parseInt(day[4]);

        if(day[3]==="tablet"){
          $scope.tablet++;
        } else if(day[3]==="mobile"){
          $scope.mobile++;
        } else if(day[3]==="desktop"){
          $scope.desktop++;
        }
        if(day[2] === "male") $scope.male++; 
        if(day[2] === "female") $scope.female++; 
      }
    }
    $scope.ratio = (totalOnes / totalCount) * 100;
    console.log($scope.ratio);
  }//dayRatio

  $scope.fourteen = function() {
    //loop through and capture all 14 distinct dates, for now, let's hardcode it.
    console.log($scope.dayXaxis);
    // $scope.dayXaxis = ['x', '2014-7-17'];
    //xFormat: '%Y%m%d'
    setTimeout(function() {
      $scope.chart.load({
        columns: [
          ['x', '2014-7-30']
        ]
      });
    }, 1000);

  }

  });
  } //showGraph


});

  
// Project Phases
// 1. extract CSV data and load onto angularJS
// 2. have the all the charts. 
// 3. have the buttons. 
// 4. having the filtering features
// 5. styling
// 6. deployment


// method to calculate day
// loops through the entire array and check
   // for that date 
   //  then total 1's / total for that day * 100%
   //  $scope.mobile
   //  $scope.tablet
   //  %scope.desktop
   //  $scope.male
   //  $scope.female







