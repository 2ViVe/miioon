'use strict';

angular.module('2ViVe')
  .directive('equalTo',
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          ctrl.$setValidity('equalTo', element.val() === angular.element(attrs.equalTo).val());
          return viewValue;
        });
      }
    };
  })
  .directive('availabilitiesValidator', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          key: '@availabilitiesValidator'
        },
        link: function(scope, element, attrs, ctrl) {
          angular.element(element).on('blur', function() {
            var value = ctrl.$modelValue;
            if (ctrl.$isEmpty(value)) {
              return;
            }
            Registration.validateAvailabilities(scope.key, value)
              .success(function(data) {
                ctrl.$setValidity('validated', data.response.available);
              })
              .error(function() {
                ctrl.$setValidity('validated', false);
              });
          });
        }
      };
    }])
  .directive('sponsorValidator', ['Registration', '$timeout',
    function(Registration) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          sponsorName: '=',
          sponsorValidatorErrorMsg: '='
        },
        link: function(scope, element, attrs, ctrl) {

          var isInputting = false;

          element.on('focus', function() {
            isInputting = true;
          });

          element.on('blur', function() {
            isInputting = false;
            ctrl.$setViewValue(element.val());
          });

          function validate(value) {
            if (ctrl.$isEmpty(value)) {
              return;
            }

            if (!isInputting) {
              Registration.validateSponsor(value)
                .success(function (data) {
                  scope.sponsorName = data.response.name;
                  ctrl.$setValidity('sponsorError', true);
                })
                .error(function (data) {
                  scope.sponsorValidatorErrorMsg = data.meta.error.message;
                  ctrl.$setValidity('sponsorError', false);
                });
            }
            return value;
          }

          ctrl.$parsers.push(validate);
          ctrl.$formatters.push(validate);
        }
      };
    }])
  .directive('homeAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/home-address.html',
        scope: {
          homeAddress: '=',
          submitted: '=',
          form: '=',
          isHomeAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.homeAddress === undefined) {
            $scope.homeAddress = {};
          }
          var invalidFields = [];
          $scope.$on('remoteValidate', function() {
            angular.forEach(invalidFields, function(invalidField) {
              invalidField.$setValidity('validated', true);
            });
            invalidFields = [];
            Address.validateHomeAddress($scope.homeAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures.length > 0) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['home-' + failiure.field].$setValidity('validated', false);
                    $scope.form['home-' + failiure.field].errorMessageValidated = failiure.message;
                    invalidFields.push($scope.form['home-' + failiure.field]);
                  });
                  $scope.isHomeAddressValidated = false;
                } else {
                  $scope.isHomeAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isHomeAddressValidated = false;
              });
          });
        }]
      };
    }])
  .directive('webAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/web-address.html',
        scope: {
          homeAddressSource: '=',
          webAddress: '=',
          submitted: '=',
          form: '=',
          isWebAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.webAddress === undefined) {
            $scope.webAddress = {
              'first-name': '',
              'last-name': '',
              phone: '',
              'mobile-phone': '',
              email: '',
              'fax-number': ''
            };
          }
          var invalidFields = [];
          $scope.$on('remoteValidate', function() {
            angular.forEach(invalidFields, function(invalidField) {
              invalidField.$setValidity('validated', true);
            });
            invalidFields = [];
            Address.validateWebAddress($scope.webAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures.length > 0) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['web-' + failiure.field].$setValidity('validated', false);
                    $scope.form['web-' + failiure.field].errorMessageValidated = failiure.message;
                    invalidFields.push($scope.form['web-' + failiure.field]);
                  });
                  $scope.isWebAddressValidated = false;
                } else {
                  $scope.isWebAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isWebAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.webIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.webAddress[key] !== undefined) {
                  $scope.webAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.webAddress, function(value, key) {
                $scope.webAddress[key] = '';
              });
            }
          };
        }]
      };
    }])
  .directive('shipmentAddress', ['Address', 'Registration',
    function(Address, Registration) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/shipment-address.html',
        scope: {
          homeAddressSource: '=',
          shipmentAddress: '=',
          submitted: '=',
          form: '=',
          isShipmentAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.shipmentAddress === undefined) {
            $scope.shipmentAddress = {
              'first-name': '',
              'last-name': '',
              street: '',
              'street-contd': '',
              'country-id': '',
              'state-id': '',
              city: '',
              zip: '',
              phone: ''
            };
          }
          var invalidFields = [];
          $scope.$on('remoteValidate', function() {
            angular.forEach(invalidFields, function(invalidField) {
              invalidField.$setValidity('validated', true);
            });
            invalidFields = [];
            Address.validateShippingAddress($scope.shipmentAddress)
              .success(function(data) {
                var failures = data.response.failures;
                if (failures.length > 0) {
                  angular.forEach(failures, function(failiure) {
                    $scope.form['shipment-' + failiure.field].$setValidity('validated', false);
                    $scope.form['shipment-' + failiure.field].errorMessageValidated = failiure.message;
                    invalidFields.push($scope.form['shipment-' + failiure.field]);
                  });
                  $scope.isShipmentAddressValidated = false;
                } else {
                  $scope.isShipmentAddressValidated = true;
                }
              })
              .error(function() {
                $scope.isShipmentAddressValidated = false;
              });
          });
          $scope.$watch('shipmentAddress["country-id"]', function(selectedCountryId) {
            angular.forEach($scope.countries, function(country) {
              if (country.id === selectedCountryId && country.states.length === 0) {
                Registration.getShippingMethods(selectedCountryId)
                  .success(function(data) {
                    $scope.shippingMethods = data.response;
                  });
              }
            });
          });
          $scope.$watch('shipmentAddress["state-id"]', function(selectedStateId) {
            var selectedCountryId = $scope.shipmentAddress['country-id'];
            Registration.getShippingMethods(selectedCountryId, selectedStateId)
              .success(function(data) {
                $scope.shippingMethods = data.response;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.shipmentIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.shipmentAddress[key] !== undefined) {
                  $scope.shipmentAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.shipmentAddress, function(value, key) {
                $scope.shipmentAddress[key] = '';
              });
            }
          };
        }]
      };
    }])
  .directive('billingAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/billing-address.html',
        scope: {
          homeAddressSource: '=',
          billingAddress: '=',
          submitted: '=',
          form: '=',
          isBillingAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.billingAddress === undefined) {
            $scope.billingAddress = {
              'first-name': '',
              'last-name': '',
              street: '',
              'street-contd': '',
              'country-id': '',
              'state-id': '',
              city: '',
              zip: '',
              phone: ''
            };
          }
          $scope.$on('remoteValidate', function() {
            Address.validateBillingAddress($scope.billingAddress)
              .success(function() {
                $scope.isBillingAddressValidated = true;
              })
              .error(function() {
                $scope.isBillingAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.billingIsUseHomeAddress) {
              if ($scope.billingAddress === undefined) {
                $scope.billingAddress = {
                  'first-name': '',
                  'last-name': '',
                  street: '',
                  'street-contd': '',
                  'country-id': '',
                  'state-id': '',
                  city: '',
                  zip: '',
                  phone: ''
                };
              }
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.billingAddress[key] !== undefined) {
                  $scope.billingAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.billingAddress, function(value, key) {
                $scope.billingAddress[key] = '';
              });
            }
          };
        }]
      };
    }]);