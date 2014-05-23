'use strict';

angular.module('2ViVe')
  .controller('HeaderController', ['$scope', 'User', '$window', 'Shopping', 'UrlHandler', 'LocalStorage','$modal',
    function($scope, User, $window, Shopping, UrlHandler, LocalStorage, $modal) {
      $scope.user = User;
      $scope.shopping = Shopping;
      $scope.backOfficeUrl = UrlHandler.backOfficeUrl();
      $scope.replicateOwner = LocalStorage.getReplicateOwner();

      $scope.logout = function() {
        User.logout().success(function() {
          $window.location.href = '/';
        });
      };

      $scope.contactMe = function() {
        $modal.open({
          templateUrl: 'views/header-contact-me.html',
          controller: 'HeaderContactModalController',
          scope: $scope
        });
      };

    }])
    .controller('HeaderContactModalController', ['$scope', '$modalInstance',
      function($scope, $modalInstance) {
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
