'use strict';

angular
  .module('miioon/gift')
  .controller('GiftCardEmailFormController', ['$scope',
    function($scope) {
      $scope.$watch('emailForm.$invalid', function(invalid) {
        $scope.formInvalid.email = invalid;
      });
    }])
  .controller('GiftCardPostFormController', ['$scope',
    function($scope) {
      $scope.$watch('postForm.$invalid', function(invalid) {
        $scope.formInvalid.post = invalid;
      });
    }])
  .controller('GiftController', ['$scope', '$modal', 'giftCard',
    function($scope, $modal, giftCard) {
      $scope.submitted = false;
      $scope.giftCardInfo = {};
      $scope.formInvalid = {
        'email': true,
        'post': true
      };

      $scope.giftCards = giftCard.data[0].variants;
      $scope.giftCardImages = giftCard.data[0].images;

      $scope.preview = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController',
          scope: $scope
        });
      };

      $scope.purchase = function() {
        $scope.submitted = true;
        var tabInValid = false;

        angular.forEach($scope.tabs, function(tab) {
          if (tab.active && $scope.formInvalid[tab.form]) {
            tabInValid = true;
            return null;
          }
        });
        if (tabInValid || this.amountForm.$invalid) {
          return null;
        }

        giftCard.purchase($scope.selectedGiftCard, $scope.giftCardInfo);
      };

      $scope.tabs = [
        {
          title: 'Email',
          url: 'views/gift/email.html',
          form: 'email'
        }
      ];
    }]);



