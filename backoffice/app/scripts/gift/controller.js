'use strict';

angular.module('miioon/gift')
  .controller('GiftController', ['$scope', '$modal', 'giftCard', 'ipCookie', '$location', 'User', 'LocalStorage',
    function($scope, $modal, giftCard, ipCookie, $location, User, LocalStorage) {
      function initSelectedGiftCard() {
        $scope.selectedGiftCard = {
          'email-info': {},
          quantity: 1,
          image: $scope.giftCardImages[0]
        };
      }

      var domain = $location.host().split('.');
      domain = '.' + domain[domain.length - 2] + '.' + domain[domain.length - 1];

      $scope.submitted = false;
      $scope.isEditing = false;
      $scope.lineItems = [];
      if (ipCookie('giftLineItems')) {
        $scope.lineItems = ipCookie('giftLineItems');
        angular.forEach($scope.lineItems, function(lineItem) {
          delete lineItem.$$hashKey;
        });
      }
      $scope.giftCards = giftCard.data[0].variants;
      $scope.giftCardImages = giftCard.data[0].images;

      initSelectedGiftCard();

      $scope.changeCard = function() {
        angular.forEach($scope.giftCards, function(giftCard) {
          if (giftCard.id === $scope.selectedGiftCard['variant-id']) {
            $scope.selectedGiftCard.price = giftCard.price;
          }
        });
      };

      $scope.deleteItem = function(index) {
        $scope.lineItems.splice(index, 1);
        ipCookie('giftLineItems', $scope.lineItems, {
          domain: domain
        });
      };

      $scope.preview = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController',
          scope: $scope
        });
      };

      $scope.totalPrice = function() {
        var totalPrice = 0;
        angular.forEach($scope.lineItems, function(lineItem) {
          totalPrice += lineItem.price * lineItem.quantity;
        });
        return totalPrice;
      };

      $scope.edit = function(lineItem, index) {
        $scope.selectedGiftCard = angular.copy(lineItem);
        $scope.isEditing = true;
        $scope.editIndex = index;
      };

      $scope.purchase = function() {
        $scope.submitted = true;

        if (this.emailForm.$valid && this.amountForm.$valid) {

          if ($scope.isEditing) {
            $scope.isEditing = false;
            $scope.lineItems[$scope.editIndex] = angular.copy($scope.selectedGiftCard);
          } else {
            $scope.lineItems.push(angular.copy($scope.selectedGiftCard));
          }

          $scope.submitted = false;
          initSelectedGiftCard();

          ipCookie('giftLineItems', $scope.lineItems, {
            domain: domain
          });
        }
      };

      $scope.checkout = function() {
        if ($scope.lineItems.length === 0) {
          return;
        }

        if (User.isLogin) {
          $location.path('/gift/checkout');
        } else {
          LocalStorage.setPathAfterLogin('/gift/gift-card');
          $location.path('/signin');
        }
      };

    }]);



