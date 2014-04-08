'use strict';

angular.module('2ViVe', []);

angular.module('miioon-backend', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'mm.foundation.tabs'
  ])
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider', 'CLIENT_ID',
    function($httpProvider, CLIENT_ID) {
      $httpProvider.defaults.headers.common = {
        'x-client-id': CLIENT_ID,
        'x-client-secret': 'HeFsCAvsXTzpHWAqRVWCibsUYlF7gjpLRUAUw551r'
      };
    }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);