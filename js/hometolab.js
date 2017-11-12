
var app = angular.module('AUTOMETRICS',['ngCookies']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'template/orders.html', controller: OrderCtrl}).
    when('/', {templateUrl: 'template/garages.html', controller: garageCtrl});
   //otherwise({redirectTo: '/login'});
  }]);

function OrderCtrl($scope, $http) 
{
           
         $http.get('http://localhost/autometrics/autometrics/list/orders/').
            success(function(data){
              $scope.garageNames = data;
              console.log($scope.garageNames);
              console.log($scope.garageNames[0].garage_name);
              console.log($scope.garageNames.length);
              for(var i=0;i<$scope.garageNames.length;i++){
                
                console.log($scope.garageNames[i].garage_name);
                
              }
            });
      

}
function garageCtrl($scope, $http) 
{
           
         $http.get('http://localhost/autometrics/autometrics/list/garages/').
            success(function(data){
              $scope.garageNames = data;
              console.log($scope.garageNames);
              console.log($scope.garageNames[0].garage_name);
              console.log($scope.garageNames.length);
              for(var i=0;i<$scope.garageNames.length;i++){
                
                console.log($scope.garageNames[i].garage_name);
                
              }
            });
      

}