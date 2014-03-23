'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'ngQuickDate'
  ])
  .constant('apiUrl', '//199.27.105.132:10442')
  .config(['$httpProvider', 'apiUrl', function ($httpProvider, apiUrl) {

    $httpProvider.defaults.headers.post = {
      'X-Authentication-Token': 'abc'
    };

    $httpProvider.interceptors.push(['$q', function ($q) {
      return {
        'request': function (config) {

          if (config.url.indexOf('api')) {
            config.url = config.url.replace('api', apiUrl);
          }

          return config || $q.when(config);
        },
        'response': function (msg) { // todo Just for test need to remove when deploy
          console.group('RES');
          console.dir(msg);
          console.groupEnd();
          return msg || $q.when(msg);
        }
      }
    }]);
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/signin', {
        templateUrl: 'views/sign-in.html',
        controller: 'SignInController'
      })
      .when('/signup', {
        templateUrl: 'views/sign-up/all.html',
        controller: 'SignUpController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/taxon/:taxonId', {
        templateUrl: 'views/taxon.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });