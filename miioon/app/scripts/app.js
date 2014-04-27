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
]).run(['$rootScope', 'cfpLoadingBar', '$window', '$location',
  function($rootScope, cfpLoadingBar, $window, $location) {
    var securePaths = ['/signup', '/signin', '/checkout'];

    $rootScope.$on('$routeChangeStart', function() {
      cfpLoadingBar.start();

      var targetPath = $location.path();
      var targetProtocol = $location.protocol();
      var targetUrl = $location.absUrl();
      var targetPort = $location.port();

      if (targetProtocol === 'http' && securePaths.indexOf(targetPath) >= 0) {
        targetUrl = targetUrl.replace('http://', 'https://');
        if (targetPort === 11442) {
          targetUrl = targetUrl.replace(':11442', ':22442');
        }
        $window.location.href = targetUrl;
      } else if (targetProtocol === 'https' && securePaths.indexOf(targetPath) < 0) {
        targetUrl = targetUrl.replace('https://', 'http://');
        if (targetPort === 22442) {
          targetUrl = targetUrl.replace(':22442', ':11442');
        }
        $window.location.href = targetUrl;
      }
    });

    $rootScope.$on('$routeChangeError', function() {
      cfpLoadingBar.complete();
    });

    $rootScope.$on('$viewContentLoaded', function() {
      cfpLoadingBar.complete();
    });

  }]);