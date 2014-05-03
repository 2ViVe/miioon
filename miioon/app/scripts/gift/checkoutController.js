'use strict';

angular.module('2ViVe')
  .controller('GiftCheckoutController', ['$scope', 'GiftCard',
    function($scope, GiftCard) {
      $scope.creditCard = {};

      var giftCard = new GiftCard();
      giftCard.populate();
      $scope.lineItems = [giftCard.selectedGiftCard];

      $scope.placeOrder = function() {
        $scope.submitted = true;

        if (this.creditCardForm.$invalid) {
          return null;
        }

        giftCard.placeOrder($scope.creditCard);
      };
    }]);