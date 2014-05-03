'use strict';

angular.module('2ViVe')
  .factory('GiftCard', ['$http', '$cookieStore',
    function($http, $cookieStore) {
      var GiftCard = function() {};

      GiftCard.prototype.fetch = function() {
        var giftCard = this;
        return $http.get('/api/v2/products/18', {
          params: {
            'role-code': 'D',
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

      GiftCard.prototype.populate = function() {
        this.info = $cookieStore.get('giftCardInfo');
        this.selectedGiftCard = $cookieStore.get('selectedGiftCard');
      };

      GiftCard.prototype.placeOrder = function(creditcard) {
        return $http.post('/api/v2/giftcards', {
          amount: this.selectedGiftCard.price,
          'email-message': this.info['email-message'],
          'name-from': this.info['name-from'],
          'name-to': this.info['name-to'],
          'recipient-email': this.info['recipient-email'],
          'variant-id': this.selectedGiftCard.id,
          'creditcard': creditcard
        });
      };

      return GiftCard;
    }]);
