'use strict';

angular.module('2ViVe')
  .controller('GiftCheckoutController', ['$scope', 'GiftCard',
    function($scope, GiftCard) {
      $scope.creditCard = {};
      $scope.placingOrder = false;

      var giftCard = new GiftCard();
      giftCard.populate();
      $scope.lineItems = [giftCard.selectedGiftCard];

      $scope.placeOrder = function() {
        $scope.submitted = true;
        $scope.placingOrder = true;

        if (this.creditCardForm.$invalid) {
          $scope.placingOrder = false;
          return null;
        }

        giftCard.placeOrder($scope.creditCard).success(function() {
          $scope.placingOrder = false;

          if (data.response['payment-state'] === 'failed') {
            $scope.isFailed = true;
            return;
          }

          giftCard.clear();
          $scope.isSucceed = true;
          $scope.successInfo = data.response;
        });
      };
    }]);