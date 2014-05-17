'use strict';

angular.module('miioonApp')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
  }])
  .run(['User', 'UrlHandler', 'Shopping',
    function(User, UrlHandler, Shopping) {
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          UrlHandler.goToRetailSite();
          return null;
        }
        Shopping.fetch();
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar',
    function($rootScope, cfpLoadingBar) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$routeChangeError', function() {
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);