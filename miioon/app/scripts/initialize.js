'use strict';

angular.module('miioonApp')
  .constant('DEFAULT_COUNTRY_ID', 1213)
  .constant('DEFAULT_ROLE_CODE', 'R')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
  }])
  .run(['User', 'Taxons', 'Shopping',
    function(User, Taxons, Shopping) {
      User.fetch().finally(function() {
        Shopping.fetch();
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar', 'UrlHandler',
    function($rootScope, cfpLoadingBar, UrlHandler) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$locationChangeStart', function(event) {
        UrlHandler.handleSecurityPath(function() {
          event.preventDefault();
        });
      });

      $rootScope.$on('$routeChangeError', function() {
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);