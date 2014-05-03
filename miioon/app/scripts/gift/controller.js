'use strict';

angular.module('2ViVe')
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
  .controller('GiftController', ['$scope', '$modal', 'GiftCard', '$location',
    function($scope, $modal, GiftCard, $location) {
      $scope.submitted = false;
      var giftCard = new GiftCard();
      $scope.giftCardInfo = {};
      $scope.formInvalid = {
        'email': true,
        'post': true
      };

      giftCard.fetch().success(function() {
        $scope.giftCards = giftCard.data.variants;
      });

      $scope.preview = function() {
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController'
        });
      };

      $scope.purchase = function() {
        $scope.submitted = true;
        var tabInValid = false;

        angular.forEach($scope.tabs, function(tab) {
          if (tab.active && $scope.formInvalid[tab.form].$invalid) {
            tabInValid = true;
            return null;
          }
        });
        if (tabInValid || this.amountForm.$invalid) {
          return null;
        }

        giftCard.purchase($scope.selectedGiftCard, $scope.giftCardInfo);
        $location.path('/gift/checkout');
      };

      $scope.tabs = [
        {
          title: 'Email',
          url: 'views/gift/email.html',
          form: 'email'
        },
        {
          title: 'Post',
          url: 'views/gift/post.html',
          form: 'post'
        }
      ];
    }]);



