'use strict';

angular
  .module('miioon.organization', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/organization', {
        templateUrl: 'views/organization/organization.html',
        controller: 'OrganizationController',
        resolve: {
          organization : ['Organization', function(Organization){
            return new Organization();
          }]
        }
      });
  }]);
