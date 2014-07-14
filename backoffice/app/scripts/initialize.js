'use strict';

angular.module('miioonApp')
  .constant({
    'DEFAULT_COUNTRY_ID': 1213,
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
    $httpProvider.interceptors.push('BackOfficeInterceptor');
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

      $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
        if (rejection && rejection.goTo) {
          $location.path(rejection.goTo);
        } else {
          $location.path('/');
        }

        cfpLoadingBar.complete();
      });

      $rootScope.$on('$viewContentLoaded', function() {
        cfpLoadingBar.complete();
      });
    }]);