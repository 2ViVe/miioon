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
  .directive('signUpStep2', ['Registration',
    function(Registration) {
      return {
        restrict: 'C',
        controller: ['$scope', function($scope) {
          $scope.$on('RegistrationCountryChange', function(country) {
            Registration.getProducts(country.id)
              .success(function(data) {
                $scope.products = data.response.products;
              });
          });
          $scope.nextStep = function() {
            if (this.step.$valid) {
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