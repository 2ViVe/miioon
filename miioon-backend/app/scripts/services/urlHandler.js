'use strict';

angular.module('2ViVe')
  .factory('UrlHandler', ['$window', '$location', 'LocalStorage',
    function($window, $location, LocalStorage) {
      var PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE = 11442;
      var PORT_FOR_SECURE_RETAIL_DEMO_SITE = 22442;
      var PORT_FOR_BACK_OFFICE_DEMO_SITE = 22442;
      var SECURE_PATHS = ['/signup', '/signin', '/checkout', '/retail-signup', '/account'];

      var UrlHandler = {
        goToRetailSite: function() {
          $window.location.href = UrlHandler.retailUrl();
        },
        retailUrl: function() {
          var port = $location.port();
          var host = $location.host();

          if (port === PORT_FOR_BACK_OFFICE_DEMO_SITE) {
            host.replace('miioon.backoffice', 'miioon.www');
            return 'http://' + host + ':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE + '/';
          }

          return 'http://www.miioon.com';
        },
        backOfficeUrl: function() {
          var port = $location.port();
          var host = $location.host();

          if (port === PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE ||
            port === PORT_FOR_SECURE_RETAIL_DEMO_SITE) {
            host.replace('miioon.www', 'miioon.backoffice');
            return 'https://' + host + ':' + PORT_FOR_BACK_OFFICE_DEMO_SITE;
          }

          return 'https://backoffice.miioon.com';
        },
        handleSecurityPath: function(stopLocationChange) {
          var path = $location.path();
          var protocol = $location.protocol();
          var url = $location.absUrl();
          var port = $location.port();

          if (protocol === 'http' && SECURE_PATHS.indexOf(path) >= 0) {
            url = url.replace('http://', 'https://');
            if (port === PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE) {
              url = url.replace(':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE,
                  ':' + PORT_FOR_SECURE_RETAIL_DEMO_SITE);
            }
            stopLocationChange();
            $window.location.href = url;
          } else if (protocol === 'https' && SECURE_PATHS.indexOf(path) < 0) {
            url = url.replace('https://', 'http://');
            if (port === PORT_FOR_SECURE_RETAIL_DEMO_SITE) {
              url = url.replace(':' + PORT_FOR_SECURE_RETAIL_DEMO_SITE,
                  ':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE);
            }
            stopLocationChange();
            $window.location.href = url;
          }
        },
        savePath: function(nextPath, currentPath) {
          if (nextPath === '/signin' && currentPath !== '/signin') {
            LocalStorage.setPathAfterLogin(currentPath);
          } else if (nextPath === '/shopping' && currentPath !== '/shopping') {
            LocalStorage.setPathToContinueShopping(currentPath);
          }
        }
      };
      return UrlHandler;
    }]);