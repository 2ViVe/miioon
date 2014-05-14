'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', 'LocalStorage', 'User', '$location',
    function($http, LocalStorage, User, $location) {
      var Shopping = {
        mergeItems: function() {
          return Shopping.addItems(Shopping.items);
        },
        getByItemId: function(id) {
          var result;
          angular.forEach(Shopping.items, function(item) {
            if (item['variant-id'] === id) {
              result = item;
              return null;
            }
          });
          return result;
        },
        checkout: function() {
          $location.path('/checkout');
        },
        continueShopping: function() {
          var path = LocalStorage.getPathToContinueShopping();
          LocalStorage.removePathToContinueShopping();
          $location.path(path);
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
        addItems: function(items) {
          if (User.isLogin) {
            return $http.post('/api/v2/shopping-carts/users/line-items', items)
              .success(function(data) {
                Shopping.items = data.response;
              });
          }
          return $http.post('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items', items)
            .success(function(data) {
              Shopping.items = data.response;
            });
        },
        add: function(variant, quantity) {
          if (User.isLogin) {
            return $http.post('/api/v2/shopping-carts/users/line-items', [
              {
                'variant-id': variant.id,
                'quantity': quantity
              }
            ]).success(function(data) {
              Shopping.items = data.response;
            });
          }
          return $http.post('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items', [
            {
              'variant-id': variant.id,
              'quantity': quantity
            }
          ]).success(function(data) {
            Shopping.items = data.response;
          });
        },
        deleteAll: function() {
          return $http.delete('/api/v2/shopping-carts/users')
            .success(function() {
              Shopping.items = [];
            });
        },
        empty: function() {
          if (User.isLogin) {
            return $http.put('/api/v2/shopping-carts/users/line-items', [])
              .success(function(data) {
                Shopping.items = data.response;
              });
          }
          return $http.put('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items', [])
            .success(function(data) {
              Shopping.items = data.response;
            });
        },
        fetch: function() {
          if (User.isLogin) {
            return $http.get('/api/v2/shopping-carts/users')
              .then(function(response) {
                Shopping.items = response.data.response['line-items'];
                return response.data.response;
              });
          }
          if (LocalStorage.isVisitorIdSaved()) {
            return $http.get('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId())
              .then(function(response) {
                Shopping.items = response.data.response['line-items'];
                return response.data.response;
              });
          } else {
            return $http.post('/api/v2/shopping-carts/visitors', {
              'id': LocalStorage.createVisitorId()
            }).then(function(response) {
              Shopping.items = response.data.response['line-items'];
              return response.data.response;
            });
          }
        }
      };
      return Shopping;
    }]);