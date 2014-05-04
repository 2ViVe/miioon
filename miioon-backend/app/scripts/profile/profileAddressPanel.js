'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileAddressPanelCtrl', ['$scope', 'Address', function($scope, Address) {
      Address.fetch().then(function(addr) {
        $scope.address = addr[$scope.addressType.toLowerCase()];
      });
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


