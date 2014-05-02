'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope', '$modal', 'GiftCard',
    function($scope, $modal, GiftCard) {
      $scope.submitted = false;

      var giftCard = new GiftCard();
      giftCard.fetch.success(function() {
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
          if (tab.active && this[tab.form].$invalid) {
            tabInValid = true;
            return null;
          }
        });
        if (tabInValid || this.amountForm.$invalid) {
          return null;
        }
      };

      $scope.tabs = [
        {
          title: 'Email',
          url: 'views/gift/email.html',
          form: 'emailForm'
        },
        {
          title: 'Post',
          url: 'views/gift/post.html',
          form: 'postForm'
        }
      ];
    }
  ]
);



