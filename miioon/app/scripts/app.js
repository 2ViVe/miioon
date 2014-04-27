'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngProgress',
  '2ViVe',
  'ui.utils',
  'mm.foundation.tabs',
  'mm.foundation.modal',
  'duScroll'
]).run(['$rootScope' , 'ngProgress', function($rootScope, ngProgress) {
  $rootScope.$on('$routeChangeStart', function() {
    ngProgress.start();
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    ngProgress.complete();
  });

  $rootScope.$on('$routeChangeError', function() {
    ngProgress.complete();
  });

}]);