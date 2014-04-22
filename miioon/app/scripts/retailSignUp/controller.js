angular.module('2ViVe')
  .controller('RetailSignUpController', [
    '$scope',
    'Registration',
    function($scope, Registration) {

      var self = $scope;

      self.countries = Registration.countries();
    }
  ]);