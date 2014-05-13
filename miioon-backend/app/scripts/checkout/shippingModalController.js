'use strict';

angular.module('2ViVe')
  .controller('ShippingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.shippingAddress = {};

      var invalidFields = [];

      $scope.submit = function() {
        $scope.submitted = true;
        var form = this.form;
        if (form.$valid) {
          var shippingAddress = {
            'first-name': $scope.shippingAddress['first-name'],
            'last-name': $scope.shippingAddress['last-name'],
            'street': $scope.shippingAddress.street,
            'street-cont': $scope.shippingAddress['street-cont'],
            'city': $scope.shippingAddress.city,
            'zip': $scope.shippingAddress.zip,
            'state-id': $scope.shippingAddress.state.id,
            'state': $scope.shippingAddress.state.name,
            'country-id': $scope.shippingAddress.country.id,
            'country': $scope.shippingAddress.country.name,
            'phone': $scope.shippingAddress.phone
          };
          Address.validateShippingAddress(shippingAddress)
            .success(function(data) {
              angular.forEach(invalidFields, function(invalidField) {
                invalidField.$setValidity('validated', true);
              });
              invalidFields = [];
              var failures = data.response.failures;
              if (failures.length > 0) {
                angular.forEach(failures, function(failiure) {
                  form['shipping-' + failiure.field].$setValidity('validated', false);
                  form['shipping-' + failiure.field].errorMessageValidated = failiure.message;
                  invalidFields.push(form['shipping-' + failiure.field]);
                });
              } else {
                $modalInstance.close(shippingAddress);
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



