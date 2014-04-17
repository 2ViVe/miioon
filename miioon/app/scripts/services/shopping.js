'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', '$cookies', 'UUID',
    function($http, $cookies, UUID) {
      var Shopping = {
        add: function(variant, quantity) {
          var visitorId = $cookies.visitorId;
          return $http.post('/api/v2/shopping-carts/visitors/' + visitorId + '/line-items', [
              {
                'variant-id': variant.id,
                'quantity': quantity
              }
            ])
            .success(function(data) {
              Shopping.items = data.response;
            });
        },
        fetch: function() {
          if ($cookies.visitorId) {
            $http.get('/api/v2/shopping-carts/visitors/' + $cookies.visitorId)
              .success(function(data) {
                Shopping.items = data.response['line-items'];
              });
          } else {
            $cookies.visitorId = UUID.generate();
            $http.post('/api/v2/shopping-carts/visitors', {
              'id': $cookies.visitorId
            });
          }
        }
      };
      return Shopping;
    }]);