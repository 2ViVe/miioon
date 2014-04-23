'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', 'LocalStorage', 'User', '$location',
    function($http, LocalStorage, User, $location) {
      var Shopping = {
        getByItemId: function(id) {
          var result;
          angular.forEach(Shopping.items, function(item) {
            if (item['variant-id'] === id) {
              result = item;
              return;
            }
          });
          return result;
        },
        checkout: function() {
          if (User.isLogin) {
            $location.path('/checkout');
          } else {
            LocalStorage.setPathAfterLogin('/checkout');
            $location.path('/signin');
          }
        },
        getItemIds: function() {
          var itemIds = [];
          angular.forEach(Shopping.items, function(item) {
            itemIds.push(item['variant-id']);
          });
          return itemIds;
        },
        removeItem: function(variantId) {
          var itemIndex;
          angular.forEach(Shopping.items, function(item, index) {
            if (item['variant-id'] === variantId) {
              itemIndex = index;
            }
          });
          Shopping.items.splice(itemIndex, 1);
          return Shopping.update();
        },
        update: function() {
          if (User.isLogin) {
            return $http.put('/api/v2/shopping-carts/users/line-items', Shopping.items);
          }
          return $http.put('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items', Shopping.items);
        },
        add: function(variant, quantity) {
          if (User.isLogin) {
            return $http.post('/api/v2/shopping-carts/users/line-items', [
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
          return $http.get('/api/v2/shopping-carts/users')
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