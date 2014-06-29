'use strict';

angular.module('miioon/signup')
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', 'Registration', function($scope, Registration) {

        $scope.$watchCollection('[address.shipping.country, address.shipping.state]',
          function(values) {
            var country = values[0];
            var state = values[1];
            if (country && state) {
              Registration.getShippingMethods(
                country.id,
                state.id,
                $scope.products.selection.variantId)
                .success(function(data) {
                  $scope.shippingMethods = data.response;
                  $scope.method.shipping = $scope.shippingMethods[0];
                });
            }
          });

        if ($scope.address.billing) {
          $scope.address.types = ['home', 'shipping', 'website'];
        }

        $scope.nextStep = function() {
          $scope.submitted = true;

          if (this.step3.$valid) {
            $scope.address.validate().then(function() {
              $scope.goToNextStep();
            });
          }
        };
      }]
    };
  }]);
