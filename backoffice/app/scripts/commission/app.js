'use strict';

angular
  .module('mio/commission', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/commission/report', {
        templateUrl: 'views/commission/report.html',
        controller: 'CommissionReportController',
        resolve: {
          commission : ['Commission', function(Commission){
            return new Commission().fetchType();
          }]
        }
      })
      .when('/commission/rank', {
        templateUrl: 'views/commission/rank.html',
        controller: 'CommissionRankController'
      });
  }]);