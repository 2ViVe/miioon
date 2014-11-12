'use strict';

angular.module('miioon/gift')
  .controller('GiftController', ['$scope', '$modal', 'giftCard', 'ipCookie', '$location', 'User', 'LocalStorage', '$route',
    function($scope, $modal, giftCard, ipCookie, $location, User, LocalStorage, $route) {
      function initSelectedGiftCard() {
        $scope.selectedGiftCard = {
          'email-info': {},
          quantity: 1,
          image: $scope.giftCardImages[0]
        };
      }

      function edit(lineItem, index) {
        $scope.selectedGiftCard = angular.copy(lineItem);
        $scope.isEditing = true;
        $scope.editIndex = index;
      }

      var domain = $location.host().split('.');
      domain = '.' + domain[domain.length - 2] + '.' + domain[domain.length - 1];

      $scope.submitted = false;
      $scope.isEditing = false;
      $scope.lineItems = [];
      $scope.imgsrc = '/images/gift/gift-card-3.jpg';
      $scope.changeImgSrc = function(){
        $scope.imgsrc = '/images/gift/gift-card-4.jpg';
      }
      $scope.changeImgSrcBack = function(){
        $scope.imgsrc = '/images/gift/gift-card-3.jpg';
      }
      if (ipCookie('giftLineItems')) {
        $scope.lineItems = ipCookie('giftLineItems');
        angular.forEach($scope.lineItems, function(lineItem) {
          delete lineItem.$$hashKey;
        });
      }
      $scope.giftCards = giftCard.data[0].variants;
      $scope.giftCardImages = giftCard.data[0].images;

      initSelectedGiftCard();

      var editIndex = parseInt($route.current.params.editIndex);
      if (editIndex >= 0 && $scope.lineItems[editIndex]) {
        edit($scope.lineItems[editIndex], editIndex);
      }

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

      $scope.productMenu = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-product-menu.html',
          controller: 'GiftModalController',
          windowClass : 'product-menu',
          scope: $scope
        });
      };

      $scope.dynamicPopover = "Hello, World!";
      $scope.dynamicPopoverTitle = "Title";

      $scope.totalPrice = function() {
        var totalPrice = 0;
        angular.forEach($scope.lineItems, function(lineItem) {
          totalPrice += lineItem.price * lineItem.quantity;
        });
        return totalPrice;
      };

      $scope.edit = edit;

      $scope.purchase = function() {
        $scope.submitted = true;

        if (this.emailForm.$valid && this.amountForm.$valid) {
          $scope.selectedGiftCard.quantity = parseInt($scope.selectedGiftCard.quantity);

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
          $location.path('/gift-shopping-options');
        } else {
          LocalStorage.setPathAfterLogin('/gift/gift-card');
          $location.path('/signin');
        }
      };

      $scope.parsePrice = function(price){
        return (Math.round(price * 100) / 100).toFixed(2);
      }
    }]);



