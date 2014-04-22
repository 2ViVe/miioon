'use strict';

angular.module('2ViVe')
  .controller('RetailSignUpController', [
    '$scope',
    'Registration',
    function($scope, Registration) {
      $scope.countries = Registration.countries();
    }
  ]);