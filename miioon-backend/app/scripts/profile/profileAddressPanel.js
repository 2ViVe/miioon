'use strict';

(function() {

  angular.module('2ViVe')
    .controller('profileAddressPanelCtrl', ['$scope', 'Address', 'Registration', function($scope, Address, Registration) {

      $scope.isEditing = false;
      $scope.isLoading = true;

      Address.fetch().then(function(addr) {
        $scope.address = addr[$scope.addressType.toLowerCase()];
        $scope.initAddress = angular.copy($scope.address);
      });

      Registration.countries().then(function(result) {
        $scope.countries = result;
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

      $scope.getCountryName = function(countryId) {
        if (!$scope.countries) return '';
        angular.forEach($scope.countries, function(country) {
          if (country.id === countryId) {
            $scope.address.country = country.name;
            return;
          }
        });
        return $scope.address.country;
      };

      $scope.getStates = function(selectedCountryId) {
        angular.forEach($scope.countries, function(country) {
          if (country.id === selectedCountryId) {
            $scope.states = country.states;
            return;
          }
        });
        return $scope.states;
      };

      $scope.getCountryById = function(countryId) {
        var country;
        if (!$scope.countries) return null;
        angular.forEach($scope.countries, function(c) {
          if (c.id === countryId) {
            country = c;
            return;
          }
        });
        return country;
      };

      $scope.getStateName = function(countryId, stateId) {
        var result = '';
        if (!$scope.countries) { return ''; }
        if (!$scope.getStates(countryId)) { return ''; }
        angular.forEach($scope.getStates(countryId), function(state) {
          if (state.id === stateId) {
            result = state.name;
          }
        });
        return result;
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


