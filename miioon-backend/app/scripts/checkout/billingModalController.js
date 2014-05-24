'use strict';

angular
  .module('miioon/checkout')
  .controller('BillingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.billingAddress = {};

      var invalidFields = [];

      $scope.submit = function() {
        var form = this.form;
        if ($scope.submitted || form.$valid) {
          var billingAddress = {
            'first-name': $scope.billingAddress['first-name'],
            'last-name': $scope.billingAddress['last-name'],
            'street': $scope.billingAddress.street,
            'street-cont': $scope.billingAddress['street-cont'],
            'city': $scope.billingAddress.city,
            'zip': $scope.billingAddress.zip,
            'state-id': $scope.billingAddress.state.id,
            'state': $scope.billingAddress.state.name,
            'country-id': $scope.billingAddress.country.id,
            'country': $scope.billingAddress.country.name,
            'phone': $scope.billingAddress.phone
          };

          angular.forEach(invalidFields, function(invalidField) {
            invalidField.$setValidity('validated', true);
          });
          invalidFields = [];
          $scope.$billingAddressErrors = {};

          Address.validateBillingAddressNew(billingAddress)
            .then(function() {
              $modalInstance.close(billingAddress);
            })
            .catch(function(failures) {
              angular.forEach(failures, function(failiure) {
                form['billing-' + failiure.field].$setValidity('validated', false);
                invalidFields.push(form['billing-' + failiure.field]);
              });
              $scope.$billingAddressErrors = failures;
            });
        }
        $scope.submitted = true;
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);