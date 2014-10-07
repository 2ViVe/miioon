'use strict';

angular.module('miioon/signup')
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', 'Registration', function($scope, Registration) {

        $scope.debug = function() {
          $scope.account.birthday = '1984-05-03';
          $scope.account.socialSecurityNumber = Math.random().toString().substr(2, 9);
          $scope.address.home.firstName = '123';
          $scope.address.home.lastName = '123';
          $scope.address.home.street = '123';
          $scope.address.home.city = 'Fairbanks';
          $scope.address.home.zip = '99701';
          $scope.address.home.phone = '123';

          $scope.address.shipping.firstName = '123';
          $scope.address.shipping.lastName = '123';
          $scope.address.shipping.street = '123';
          $scope.address.shipping.city = 'Fairbanks';
          $scope.address.shipping.zip = '99701';
          $scope.address.shipping.phone = '123';

          $scope.address.website.firstName = '123';
          $scope.address.website.lastName = '123';
          $scope.address.website.phone = '123';
        };

//        $scope.debug();

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
