'use strict';

angular.module('2ViVe')
  .factory('UrlHandler', ['$window', '$location', 'LocalStorage',
    function($window, $location, LocalStorage) {
      var PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE = 11442;
      var PORT_FOR_SECURE_RETAIL_DEMO_SITE = 22442;
      var PORT_FOR_BACK_OFFICE_DEMO_SITE = 33442;
      var SECURE_PATHS = ['/signup', '/signin', '/checkout', '/retail-signup'];

      return {
        backOfficeUrl: function() {
          var port = $location.port();
          var protocol = $location.protocol();
          var url = $location.absUrl();

          if (port === PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE ||
            port === PORT_FOR_SECURE_RETAIL_DEMO_SITE) {
            url = url.replace(':' + port, ':' + PORT_FOR_BACK_OFFICE_DEMO_SITE);
            return url.replace(protocol + ':', 'https:');
          }

          return url.indexOf('www.miioon') >= 0 ?
            url.replace('www.miioon', 'backoffice.miioon') :
            url.replace('miioon', 'backoffice.miioon');
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
    }]);