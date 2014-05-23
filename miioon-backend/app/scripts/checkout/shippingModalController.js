'use strict';

angular.module('2ViVe')
  .controller('ShippingModalController', ['$scope', '$modalInstance', 'Address',
    function($scope, $modalInstance, Address) {
      $scope.shippingAddress = {};

      var invalidFields = [];

      $scope.submit = function() {
        var form = this.form;
        if ($scope.submitted || form.$valid) {
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

          angular.forEach(invalidFields, function(invalidField) {
            invalidField.$setValidity('validated', true);
          });

          Address.validateShippingAddressNew(shippingAddress)
            .then(function() {
              $modalInstance.close(shippingAddress);
            })
            .catch(function(failures) {
              angular.forEach(failures, function(failiure) {
                form['shipping-' + failiure.field].$setValidity('validated', false);
                invalidFields.push(form['shipping-' + failiure.field]);
              });
              $scope.$shippingAddressErrors = failures;
            });
        }
        $scope.submitted = true;
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);