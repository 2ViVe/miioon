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
        }
      };
    }]);