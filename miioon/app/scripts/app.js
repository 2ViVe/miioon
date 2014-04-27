'use strict';

angular.module('2ViVe', []);

angular.module('miioonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'chieffancypants.loadingBar',
  '2ViVe',
  'ui.utils',
  'mm.foundation.tabs',
  'mm.foundation.modal',
  'duScroll'
]).run(['$rootScope', 'cfpLoadingBar', 'UrlHandler',
  function($rootScope, cfpLoadingBar, UrlHandler) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      cfpLoadingBar.start();
      UrlHandler.handleSecurityPath();
      if (current) {
        UrlHandler.savePathBeforeSignIn(next.$$route.originalPath, current.$$route.originalPath);
      }
    });

    $rootScope.$on('$routeChangeError', function() {
      cfpLoadingBar.complete();
    });

    $rootScope.$on('$viewContentLoaded', function() {
      cfpLoadingBar.complete();
    });

  }]);