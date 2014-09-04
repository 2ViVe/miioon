'use strict';

angular.module('miioon/gift')
  .controller('GiftCheckoutController', ['$scope', 'GiftCard', 'ipCookie', '$location',
    function($scope, GiftCard, ipCookie, $location) {
      var domain = $location.host().split('.');
      domain = '.' + domain[domain.length - 2] + '.' + domain[domain.length - 1];

      $scope.creditCard = {};
      $scope.placingOrder = false;

      var giftCard = new GiftCard();
      giftCard.populate();
      $scope.lineItems = ipCookie('giftLineItems');

      $scope.totalPrice = 0;
      angular.forEach($scope.lineItems, function(lineItem) {
        $scope.totalPrice += lineItem.price;
      });

      $scope.placeOrder = function() {
        $scope.submitted = true;
        $scope.placingOrder = true;

        if (this.creditCardForm.$invalid) {
          $scope.placingOrder = false;
          return null;
        }

        giftCard.placeOrderWithMultiple($scope.creditCard).success(function(data) {
          $scope.placingOrder = false;

          if (data.response['payment-state'] === 'failed') {
            $scope.isFailed = true;
            return;
          }

          giftCard.clear();
          ipCookie.remove('giftLineItems', {
            domain: domain
          });
          $scope.isSucceed = true;
          $scope.successInfo = data.response;
        });
      };
    }]);
