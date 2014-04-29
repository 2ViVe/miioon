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
        },
        adjustments: function(shippingMethodId) {
          return $http.post('/api/v2/orders/adjustments', {
            'shipping-method-id': shippingMethodId,
            'line-items': Order.data['line-items'],
            'shipping-address': Order.data['shipping-address'],
            'billing-address': Order.data['billing-address']
          }).success(function(data) {
            Order.data.adjustments = data.response;
          });
        },
        create: function(paymentMethodId, shippingMethodId, creditCard) {
          return $http.post('/api/v2/orders', {
            'payment-method-id': paymentMethodId,
            'shipping-method-id': shippingMethodId,
            'creditcard': creditCard,
            'shipping-address': Order.data['shipping-address'],
            'billing-address': Order.data['billing-address'],
            'line-items': Order.data['line-items']
          }).success(function(data) {
            console.log(data);
          });
        }
      };
      return Order;
    }]);