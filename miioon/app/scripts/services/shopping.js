'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', 'LocalStorage', 'Profile',
    function($http, LocalStorage, Profile) {
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
          return $http.post('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items', [
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
          if (LocalStorage.isVisitorIdSaved()) {
            return $http.get('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId())
              .success(function(data) {
                Shopping.items = data.response['line-items'];
              });
          } else {
            return $http.post('/api/v2/shopping-carts/visitors', {
              'id': LocalStorage.createVisitorId()
            });
          }
        }
      };
      return Shopping;
    }]);