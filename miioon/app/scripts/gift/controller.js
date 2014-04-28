'use strict';

angular.module('2ViVe')
  .controller('GiftController', ['$scope',
    function($scope) {


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



