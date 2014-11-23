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
  .run(['User', 'UrlHandler', 'Shopping', '$location',
    function(User, UrlHandler, Shopping, $location) {
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          UrlHandler.goToRetailSite();
          return null;
        }
        if (User.shouldRenew) {
          Shopping.empty();
          if (['/checkout', '/shopping', '/products/system'].indexOf($location.path()) < 0) {
            $location.path('/products/renewal-items');
          }
        }
        Shopping.fetch();
      }).catch(function() {
        UrlHandler.goToRetailSite('/signin');
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar', '$location','User',
    function($rootScope, cfpLoadingBar, $location, User) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
        if (User.shouldRenew &&
          ['/checkout', '/shopping', '/products/system'].indexOf($location.path()) < 0) {
          $location.path('/products/renewal-items');
        }
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
