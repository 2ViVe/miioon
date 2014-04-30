'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope', '$modal',
    function($scope,$modal) {

      //modal
      $scope.preview = function(){
        $modal.open({
          templateUrl: 'views/gift/gift-preview.html',
          controller: 'GiftModalController'
        });
      };


      //tabs
      $scope.tabs = [
        {
          'title': 'EMAIL',
          url: 'views/gift/email.html'
        },
        {
          'title': 'POST',
          url: 'views/gift/post.html'
        }
      ];
    }
  ]
);



