'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', '$cookies', 'UUID', 'Profile',
    function($http, $cookies, UUID, Profile) {
      var Shopping = {
        add: function(variant, quantity) {
          if (Profile.isLogin) {
            return $http.post('/api/v2/shopping-carts/users/' + Profile.data['user-id'] + '/line-items', [
                {
                  'variant-id': variant.id,
                  'quantity': quantity
                }
              ])
              .success(function(data) {
                Shopping.items = data.response;
              });
          }
          return $http.post('/api/v2/shopping-carts/visitors/' + $cookies.visitorId + '/line-items', [
              {
                'variant-id': variant.id,
                'quantity': quantity
              }
            ])
            .success(function(data) {
              Shopping.items = data.response;
            });
        },
        fetchForUser: function() {
          return $http.get('/api/v2/shopping-carts/users/' + Profile.data['user-id'])
            .success(function(data) {
              Shopping.items = data.response['line-items'];
            });
        },
        fetchForVisitor: function() {
          if ($cookies.visitorId) {
            return $http.get('/api/v2/shopping-carts/visitors/' + $cookies.visitorId)
              .success(function(data) {
                Shopping.items = data.response['line-items'];
              });
          } else {
            $cookies.visitorId = UUID.generate();
            return $http.post('/api/v2/shopping-carts/visitors', {
              'id': $cookies.visitorId
            });
          }
        }
      };
      return Shopping;
    }]);