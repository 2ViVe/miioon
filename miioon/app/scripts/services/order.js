'use strict';

angular.module('2ViVe')
  .factory('Order', ['$http',
    function($http) {
      var Order = {
        data: {},
        checkout: function(lineItems) {
          return $http.post('/api/v2/orders/checkout', {
            'line-items': lineItems
          }).success(function(data) {
            Order.data = data.response;
          });
        }
      };
      return Order;
    }]);