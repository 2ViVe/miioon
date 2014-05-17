'use strict';

angular.module('2ViVe')
  .factory('Shopping', ['$http', 'LocalStorage', 'User', '$location', 'Variant',
    function($http, LocalStorage, User, $location, Variant) {
      var useCache = false;

      var Shopping = {
        mergeItems: function() {
          return Shopping.addItems(Shopping.items);
        },
        checkout: function() {
          $location.path('/checkout');
        },
        continueShopping: function() {
          var path = LocalStorage.getPathToContinueShopping();
          LocalStorage.removePathToContinueShopping();
          $location.path(path);
        },
        removeItem: function(item) {
          var itemIndex;
          angular.forEach(Shopping.items, function(_item, index) {
            if (_item === item) {
              itemIndex = index;
            }
          });
          Shopping.items.splice(itemIndex, 1);
          return Shopping.update();
        },
        update: function() {
          var url = User.isLogin ?
            '/api/v2/shopping-carts/users/line-items' :
            '/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items';
          return $http.put(url, Shopping.items)
            .success(function() {
              useCache = false;
            });
        },
        addItems: function(items) {
          var url = User.isLogin ?
            '/api/v2/shopping-carts/users/line-items' :
            '/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items';
          return $http.post(url, items)
            .success(function(data) {
              Shopping.items = data.response;
              useCache = false;
            });
        },
        add: function(variant, quantity, catalogCode) {
          var url = User.isLogin ?
            '/api/v2/shopping-carts/users/line-items' :
            '/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items';

          return $http.post(url, [
            {
              'variant-id': variant.id,
              'quantity': quantity,
              'catalog-code': catalogCode
            }
          ]).success(function(data) {
            Shopping.items = data.response;
            useCache = false;
          });
        },
        deleteAll: function() {
          var url = User.isLogin ?
            '/api/v2/shopping-carts/users' :
            '/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId();
          return $http.delete(url)
            .success(function() {
              Shopping.items = [];
              useCache = false;
            });
        },
        empty: function() {
          var url = User.isLogin ?
            '/api/v2/shopping-carts/users/line-items' :
            '/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId() + '/line-items';

          return $http.put(url, [])
            .success(function(data) {
              Shopping.items = data.response;
              useCache = false;
            });
        },
        fetch: function() {
          var updateItemsWithVariantsData = function() {
            angular.forEach(Shopping.items, function(item) {
              Variant.fetch(item['variant-id'], item['catalog-code'])
                .then(function(response) {
                  item.data = response.data.response;
                });
            });
          };

          if (User.isLogin) {
            return $http.get('/api/v2/shopping-carts/users', {
              cache: useCache
            }).then(function(response) {
              Shopping.items = response.data.response['line-items'];
              updateItemsWithVariantsData();
              useCache = true;
              return Shopping;
            });
          }
          if (LocalStorage.isVisitorIdSaved()) {
            return $http.get('/api/v2/shopping-carts/visitors/' + LocalStorage.getVisitorId(), {
              cache: useCache
            }).then(function(response) {
              Shopping.items = response.data.response['line-items'];
              updateItemsWithVariantsData();
              useCache = true;
              return Shopping;
            });
          } else {
            return $http.post('/api/v2/shopping-carts/visitors', {
              'id': LocalStorage.createVisitorId()
            }).then(function(response) {
              Shopping.items = response.data.response['line-items'];
              updateItemsWithVariantsData();
              useCache = false;
              return Shopping;
            });
          }
        }
      };
      return Shopping;
    }]);