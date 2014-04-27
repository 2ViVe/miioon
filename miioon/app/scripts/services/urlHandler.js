'use strict';

angular.module('2ViVe')
  .factory('UrlHandler', ['$window', '$location', 'LocalStorage',
    function($window, $location, LocalStorage) {
      var PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE = 11442;
      var PORT_FOR_SECURE_RETAIL_DEMO_SITE = 22442;
      var PORT_FOR_BACK_OFFICE_DEMO_SITE = 33442;

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
            url.replace('www.miioon', 'back-office.miioon') :
            url.replace('miioon', 'back-office.miioon');
        },
        handleSecurityPath: function() {
          var securePaths = ['/signup', '/signin', '/checkout'];
          var targetPath = $location.path();
          var targetProtocol = $location.protocol();
          var targetUrl = $location.absUrl();
          var targetPort = $location.port();

          if (targetProtocol === 'http' && securePaths.indexOf(targetPath) >= 0) {
            targetUrl = targetUrl.replace('http://', 'https://');
            if (targetPort === PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE) {
              targetUrl = targetUrl.replace(':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE,
                  ':' + PORT_FOR_SECURE_RETAIL_DEMO_SITE);
            }
            $window.location.href = targetUrl;
          } else if (targetProtocol === 'https' && securePaths.indexOf(targetPath) < 0) {
            targetUrl = targetUrl.replace('https://', 'http://');
            if (targetPort === PORT_FOR_SECURE_RETAIL_DEMO_SITE) {
              targetUrl = targetUrl.replace(':' + PORT_FOR_SECURE_RETAIL_DEMO_SITE,
                  ':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE);
            }
            $window.location.href = targetUrl;
          }
        },
        savePathBeforeSignIn: function(nextPath, currentPath) {
          if (nextPath === '/signin') {
            LocalStorage.setPathAfterLogin(currentPath);
          }
        }
      };
    }]);