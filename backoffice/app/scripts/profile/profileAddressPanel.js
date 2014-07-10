'use strict';

(function() {

  angular.module('2ViVe')
    .directive('datePicker', function() {
      return {
        restrict: 'C',
        link: function(scope, element) {
          var maxDate = moment().add(-18, 'years');
          var minDate = moment().add(-150, 'years');

          new Pikaday({
            field: angular.element(element)[0],
            yearRange: [minDate.year(), maxDate.year()],
            defaultDate: moment().add(-30, 'years').toDate(),
            minDate: minDate.toDate(),
            maxDate: maxDate.toDate()
          });
        }
      };
    })
    .controller('profileAddressPanelCtrl', ['$scope', 'Address', 'Registration', 'Registration.Countries', function($scope, Address, Registration, Countries) {

      $scope.isEditing = false;
      $scope.isLoading = true;

      Countries.fetch().then(function(countries) {
        $scope.countries = countries.data;
        Address
          .fetch()
          .then(function(addr) {
            if (!addr[$scope.addressType.toLowerCase()]) {
              addr.addType($scope.addressType.toLowerCase());
            }
            $scope.address = addr[$scope.addressType.toLowerCase()];
            $scope.initAddress = angular.copy($scope.address);
          });
      });


      $scope.restore = function() {
        return angular.extend($scope.address, $scope.initAddress);
      };

      $scope.toggle = function() {
        $scope.isEditing = !$scope.isEditing;
      };

      $scope.save = function(isValid) {
        if (!isValid) {
          return;
        }
        $scope.address.update()
          .then(function() {
            $scope.isEditing = false;
            $scope.initAddress = angular.copy($scope.address);
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
        link: function() {
        }
      };
    });

})();