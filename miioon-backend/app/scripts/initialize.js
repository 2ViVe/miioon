'use strict';

angular.module('miioonApp')
  .constant('DEFAULT_COUNTRY_ID', 1213)
  .constant('DEFAULT_ROLE_CODE', 'R')
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
  .run(['$rootScope', 'cfpLoadingBar', '$location',
    function($rootScope, cfpLoadingBar, $location) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);