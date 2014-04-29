'use strict';

angular.module('2ViVe')
  .controller('BillingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.billingAddress = {};

      var invalidFields = [];

      $scope.submit = function() {
        $scope.submitted = true;
        var form = this.form;
        if (form.$valid) {
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
          Address.validateBillingAddress(billingAddress)
            .success(function(data) {
              angular.forEach(invalidFields, function(invalidField) {
                invalidField.$setValidity('validated', true);
              });
              invalidFields = [];
              var failures = data.response.failures;
              if (failures.length > 0) {
                angular.forEach(failures, function(failiure) {
                  form['billing-' + failiure.field].$setValidity('validated', false);
                  form['billing-' + failiure.field].errorMessageValidated = failiure.message;
                  invalidFields.push(form['billing-' + failiure.field]);
                });
              } else {
                $modalInstance.close(billingAddress);
              }
            });
        }
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);



