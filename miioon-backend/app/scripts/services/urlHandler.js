'use strict';

angular.module('2ViVe')
  .factory('UrlHandler', ['$window', '$location',
    function($window, $location) {
      var PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE = 11442;
      var PORT_FOR_SECURE_RETAIL_DEMO_SITE = 22442;
      var PORT_FOR_BACK_OFFICE_DEMO_SITE = 22442;
      var SECURE_PATHS = ['/signup', '/signin', '/checkout', '/retail-signup', '/account'];

      var UrlHandler = {
        goToRetailSite: function(path) {
          path = path ? path : '';
          $window.location.href = UrlHandler.retailUrl() + '/#' + path;
        },
        retailUrl: function() {
          var port = $location.port();
          if (port === PORT_FOR_BACK_OFFICE_DEMO_SITE) {
            return 'http://' + $location.host().replace('miioon.backoffice', 'miioon.www') +
              ':' + PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE;
          }

          return 'http://preview.miioon.com';
        },
        goToBackOffice: function(path) {
          path = path ? path : '';
          $window.location.href = UrlHandler.backOfficeUrl() + '/#' + path;
        },
        backOfficeUrl: function() {
          var port = $location.port();
          if (port === PORT_FOR_NON_SECURE_RETAIL_DEMO_SITE ||
            port === PORT_FOR_SECURE_RETAIL_DEMO_SITE) {
            return 'https://' + $location.host().replace('miioon.www', 'miioon.backoffice') +
              ':' + PORT_FOR_BACK_OFFICE_DEMO_SITE;
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
        }
      };
      return UrlHandler;
    }]);