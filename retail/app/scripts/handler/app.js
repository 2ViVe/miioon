'use strict';

angular
  .module('miioon/handler', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/find-handler', {
        templateUrl: 'views/handler/handler.html',
        controller: 'handlerController'
      });
  }]);