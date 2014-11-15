'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', [function() {

}]);