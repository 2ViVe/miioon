'use strict';

angular.module('2ViVe')
  .factory('UrlHandler', ['$window', '$location',
    function($window, $location) {
      return {
        backOfficeUrl: function() {
          var port = $location.port();
          var protocol = $location.protocol();
          var url = $location.absUrl();

          if (port === 11442 || port === 22442) {
            url = url.replace(':' + port, ':33442');
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
        }
      };
    }]);