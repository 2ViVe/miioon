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
  .controller('GiftController', ['$scope', '$modal', 'GiftCard', '$location', 'User', 'LocalStorage',
    function($scope, $modal, GiftCard, $location, User, LocalStorage) {
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
          controller: 'GiftModalController',
          scope: $scope
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
        if (User.isLogin) {
          $location.path('/gift/checkout');
        } else {
          LocalStorage.setPathAfterLogin('/gift/checkout');
          $location.path('/signin');
        }

      };

      $scope.tabs = [
        {
          title: 'Email',
          url: 'views/gift/email.html',
          form: 'email'
        }
      ];
    }]);



