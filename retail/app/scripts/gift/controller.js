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
      $scope.lineItems = ipCookie('giftLineItems') ? ipCookie('giftLineItems') : [];
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

      $scope.preview = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController',
          scope: $scope
        });
      };

      $scope.$watch('lineItems', function(lineItems) {
        $scope.totalPrice = 0;
        angular.forEach(lineItems, function(lineItem) {
          $scope.totalPrice += lineItem.price;
        });
      });

      $scope.edit = function(lineItem, index) {
        $scope.selectedGiftCard = lineItem;
        $scope.isEditing = true;
        $scope.editIndex = index;
      };

      console.log($scope.lineItems);

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
//          if (User.isLogin) {
//            $location.path('/gift-shopping-options');
//          } else {
//            LocalStorage.setPathAfterLogin('/gift-shopping-options');
//            $location.path('/signin');
//          }

        }
      };

    }]);



