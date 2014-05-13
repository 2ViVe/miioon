'use strict';

angular.module('2ViVe')
  .factory('Tools', ['$http', 'CamelCaseLize', function($http, camelcase) {

    var url = '/api/v2/documents/links/tools'

    function Tools() {}

    Tools.fetch = function() {
      return $http.get('/api/v2/documents/links/tools', {
        transformResponse:  camelcase
      }).then(function(resp) {
        return resp.data.response;
      });
    };

    return Tools;
  }]);