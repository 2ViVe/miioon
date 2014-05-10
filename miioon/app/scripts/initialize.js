'use strict';

angular.module('miioonApp')
  .run(['User', 'Taxons', 'Shopping',
    function(User, Taxons, Shopping) {
      User.fetch().then(function() {
        Shopping.fetchForUser();
        Taxons.fetch();
      }).catch(function() {
        Shopping.fetchForVisitor();
        Taxons.fetch();
      });
    }])
  .run(['$rootScope', 'cfpLoadingBar', 'UrlHandler',
    function($rootScope, cfpLoadingBar, UrlHandler) {
      $rootScope.$on('$routeChangeStart', function() {
        cfpLoadingBar.start();
      });

      $rootScope.$on('$locationChangeStart', function(event, nextUrl, currentUrl) {
        var nextPath = nextUrl.split('#')[1];
        var currentPath = currentUrl.split('#')[1];
        UrlHandler.savePath(nextPath, currentPath);
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