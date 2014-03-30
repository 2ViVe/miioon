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
  .directive('signUpStep1', ['Registration',
    function() {
      return {
        restrict: 'C',
        controller: ['$scope', function($scope) {
          $scope.shouldValidateRemotlyOnSubmit = false;
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
        $scope.shouldValidateRemotlyOnSubmit = false;
        $scope.$on('RegistrationCountryChange', function(country) {
          Registration.getProducts(country.id)
            .success(function(data) {
              $scope.products = data.response.products;
              console.log($scope.products);
            });
        });
      }]
    };
  }])
  .directive('signUpStep3',
  function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.shouldValidateRemotlyOnSubmit = true;
        $scope.isHomeAddressValidated = false;
        $scope.isWebAddressValidated = false;
        $scope.isShipmentAddressValidated = false;
        $scope.remoteValidate = function() {
          $scope.$broadcast('remoteValidate');
          $scope.$watchCollection(
            '[isHomeAddressValidated, isWebAddressValidated, isShipmentAddressValidated]', function() {
              if ($scope.isHomeAddressValidated && $scope.isWebAddressValidated && $scope.isShipmentAddressValidated) {
                $scope.isRemoteValidated = true;
              }
            });
        };
      }]
    };
  })
  .directive('signUpStep4',
  function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.shouldValidateRemotlyOnSubmit = true;
        $scope.isBillingAddressValidated = false;
        $scope.remoteValidate = function() {
          $scope.$broadcast('remoteValidate');
          $scope.$watch('isBillingAddressValidated', function() {
            if ($scope.isBillingAddressValidated) {
              $scope.isRemoteValidated = true;
            }
          });
        };
      }]
    };
  });