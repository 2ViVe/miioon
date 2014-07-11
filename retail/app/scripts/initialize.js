'use strict';

angular.module('miioonApp')
  .constant({
    'DEFAULT_COUNTRY_ID': 1214,
    'PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE': 11442,
    'PORT_FOR_SECURE_RETAIL_DEMO_SITE': 22442,
    'PORT_FOR_BACK_OFFICE_DEMO_SITE': 22442,
    'URL_FOR_RETAIL_PRODUCTION_SITE': 'http://www.miioon.com',
    'URL_FOR_BACK_OFFICE_PRODUCTION_SITE': 'https://backoffice.miioon.com',
    'URL_FOR_RETAIL_DEMO_SITE': 'www',
    'URL_FOR_BACK_OFFICE_DEMO_SITE': 'backoffice',
    'DEFAULT_ROLE_CODE': 'R',
    'CURRENCY_SYMBOL': '£',
    'COMPANY_CODE': 'MIO'
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('RetailInterceptor');
  }])
  .run(['User', 'Taxons', 'Shopping',
    function(User, Taxons, Shopping) {
      User.fetch().finally(function() {
        Shopping.fetch();
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar', 'UrlHandler', '$location',
    function($rootScope, cfpLoadingBar, UrlHandler, $location) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$locationChangeStart', function(event) {
        UrlHandler.handleSecurityPath(function() {
          event.preventDefault();
        });
      });

      $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);