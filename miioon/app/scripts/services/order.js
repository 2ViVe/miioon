'use strict';

angular.module('2ViVe')
  .factory('Order', ['$http',
    function($http) {
      var Order = {
        data: {},
        updateBillingAddress: function(orderId, billingAddress) {
          return $http.post('/api/v2/orders/' + orderId + '/addresses/billing', billingAddress);
        },
        updateShippingAddress: function(orderId, shippingAddress) {
          return $http.post('/api/v2/orders/' + orderId + '/shipping', {
            'shipping-address': shippingAddress
          });
        },
        adjustmentsWithOrderId: function(orderId) {
          return $http.get('/api/v2/orders/' + orderId + '/adjustments')
            .success(function(data) {
              Order.data.adjustments = data.response;
            });
        },
        currentShippingMethod: function() {
          var currentShippingMethod = null;
          angular.forEach(Order.data['available-shipping-methods'], function(shippingMethod) {
            if(shippingMethod.id === Order.data['shipping-method-id']) {
              currentShippingMethod = shippingMethod;
              return null;
            }
          });
          return currentShippingMethod;
        },
        checkout: function(lineItems) {
          return $http.post('/api/v2/orders/checkout', {
            'line-items': lineItems
          }).then(function(response) {
            Order.data = response.data.response;
            return Order;
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
          });
        }
      };
      return Order;
    }]);