'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileAddressPanelCtrl', ['$scope', 'Address', function($scope, Address) {

      $scope.isEditing = false;
      $scope.isLoading = true;

      Address.fetch().then(function(addr) {
        $scope.address = addr[$scope.addressType.toLowerCase()];
      });

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.save = function() {
        $scope.address.update()
          .then(function() {
            $scope.isEditing = false;
          })
          .catch(function() {
            $scope.isEditing = true;
          });
      };

    }])
    .directive('profileAddressPanel', function() {
      return {
        restrict: 'A',
        replace: true,
        templateUrl: '/views/profile/profile-address-panel.html',
        controller: 'profileAddressPanelCtrl',
        scope: {
          addressType: '@',
          addressTitle: '@'
        },
        link: function(scope, elem, attrs) {
        }
      };
    });

})();


