'use strict';

angular.module('2ViVe')
  .factory('GiftCard', ['$http', '$cookieStore',
    function($http, $cookieStore) {
      var GiftCard = function() {
      };

      GiftCard.prototype.fetch = function(roleCode) {
        var giftCard = this;
        return $http.get('/api/v2/products/18', {
          params: {
            'role-code': roleCode,
            'country-id': 1213,
            'catalog-code': 'GC'
          }
        }).success(function(data) {
          giftCard.data = data.response;
        });
      };

      GiftCard.prototype.purchase = function(selectedGiftCard, info) {
        $cookieStore.put('selectedGiftCard', selectedGiftCard);
        $cookieStore.put('giftCardInfo', info);
      };

      GiftCard.prototype.clear = function() {
        $cookieStore.remove('selectedGiftCard');
        $cookieStore.remove('giftCardInfo');
      };

      GiftCard.prototype.populate = function() {
        this.info = $cookieStore.get('giftCardInfo');
        this.selectedGiftCard = $cookieStore.get('selectedGiftCard');
      };

      GiftCard.prototype.placeOrder = function(creditcard) {
        var giftCard = this;

        if (giftCard.orderId) {
          return $http.post('/api/v2/giftcard-orders/' + giftCard.orderId + '/payments', {
            'creditcard': creditcard
          });
        }

        return $http.post('/api/v2/giftcards', {
          'variant-id': this.selectedGiftCard.id,
          'creditcard': creditcard,
          'email-info': this.info
        }).success(function(data) {
          if (data.response['payment-state'] === 'failed') {
            giftCard.orderId = data.response['order-id'];
          }
        });
      };

      return GiftCard;
    }]);
