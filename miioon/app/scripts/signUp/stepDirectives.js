'use strict';

angular.module('2ViVe')
  .directive('signUpStep',
  function() {
    return {
      restrict: 'C',
      link: function(scope, element) {
        angular.element(element).find('button').on('click', function() {
          angular.element(element).find('.ng-invalid:eq(0)').focus();
        });
      }
    };
  })
  .directive('signUpStep1', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.nextStep = function() {
          $scope.submitted = true;
          if (this.step.$valid) {
            $scope.$emit('NextStep');
          }
        };
      }],
      link: function(scope, element) {
        var isViewedTermAndCondition = false;
        var isAgreementChecked = false;
        var $element = angular.element(element);

        $element.find('#term-condition').on('scroll', function() {
          if (!isViewedTermAndCondition) {
            isViewedTermAndCondition = (this.scrollTop + this.offsetHeight) > this.scrollHeight;
          }
          $element.find('#is-agreed').removeAttr('disabled');
        });
        $element.find('#is-agreed').on('change', function() {
          isAgreementChecked = angular.element(this).is(':checked');
          if (isViewedTermAndCondition && isAgreementChecked) {
            $element.find('button').removeAttr('disabled');
          } else {
            $element.find('button').attr('disabled', 'disabled');
          }
        });
      }
    };
  }])
  .directive('signUpStep2', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.nextStep = function() {
          if (this.step.$valid) {
            $scope.lineItems.splice(0, $scope.lineItems.length)
            angular.forEach($scope.products, function(product) {
              if (product.quantity > 0) {
                $scope.lineItems.push({
                  'variant-id': product['variant-id'],
                  'quantity': product.quantity
                });
              }
            });
            $scope.$emit('NextStep');
          }
        };
      }]
    };
  }])
  .directive('signUpStep3', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.isHomeAddressValidated = false;
        $scope.isWebAddressValidated = false;
        $scope.isShipmentAddressValidated = false;

        $scope.nextStep = function() {
          if ($scope.submitted || this.step.$valid) {
            $scope.$broadcast('remoteValidate');
            $scope.$watchCollection(
              '[isHomeAddressValidated, isWebAddressValidated, isShipmentAddressValidated]', function() {
                if ($scope.isHomeAddressValidated && $scope.isWebAddressValidated && $scope.isShipmentAddressValidated) {
                  $scope.$emit('NextStep');
                }
              });
          }
          $scope.submitted = true;
        };
      }]
    };
  }])
  .directive('signUpStep4',
  function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.isBillingAddressValidated = false;
        $scope.submit = function() {
          $scope.submitted = true;
          if (this.step.$invalid) {
            return;
          }
          $scope.$broadcast('remoteValidate');
          $scope.$watch('isBillingAddressValidated', function() {
            if ($scope.isBillingAddressValidated) {
              $scope.$emit('CreateAccount');
            }
          });
        };
      }]
    };
  });