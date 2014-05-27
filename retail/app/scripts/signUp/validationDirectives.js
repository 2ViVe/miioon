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
                ctrl.$setValidity('available', data.response.available);
              })
              .error(function() {
                ctrl.$setValidity('available', false);
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
              ctrl.$setValidity('sponsorError', true);
              return;
            }

            if (!isInputting) {
              Registration.validateSponsor(value)
                .success(function(data) {
                  if (data.response.name === undefined) {
                    scope.sponsorValidatorErrorMsg = 'Invalid sponsor ID, please enter another one.';
                    ctrl.$setValidity('sponsorError', false);
                    return;
                  }
                  scope.sponsorName = data.response.name;
                  ctrl.$setValidity('sponsorError', true);
                })
                .error(function(data) {
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
        templateUrl: 'bower_components/2ViVe/views/miioon/home-address.html',
        scope: {
          homeAddress: '=',
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
            $scope.$homeAddressErrors = {};
            var data = angular.copy($scope.homeAddress);
            data['country-id'] = data.country.id;
            delete data.country;
            data['state-id'] = data.state.id;
            delete data.state;
            Address.validateHomeAddressNew(data)
              .then(function() {
                $scope.isHomeAddressValidated = true;
              })
              .catch(function(failures) {
                angular.forEach(failures, function(failiure) {
                  $scope.form['home-' + failiure.field].$setValidity('validated', false);
                  invalidFields.push($scope.form['home-' + failiure.field]);
                });
                $scope.$homeAddressErrors = failures;
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
        templateUrl: 'bower_components/2ViVe/views/miioon/web-address.html',
        scope: {
          homeAddressSource: '=',
          webAddress: '=',
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
            $scope.$webAddressErrors = {};
            Address.validateWebAddressNew($scope.webAddress)
              .then(function() {
                $scope.isWebAddressValidated = true;
              })
              .catch(function(failures) {
                angular.forEach(failures, function(failiure) {
                  $scope.form['web-' + failiure.field].$setValidity('validated', false);
                  invalidFields.push($scope.form['web-' + failiure.field]);
                });
                $scope.$webAddressErrors = failures;
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
  .directive('shippingAddress', ['Address',
    function(Address) {
      return {
        restrict: 'A',
        templateUrl: 'bower_components/2ViVe/views/miioon/shipping-address.html',
        scope: {
          homeAddressSource: '=',
          shippingAddress: '=',
          form: '=',
          isShippingAddressValidated: '='
        },
        controller: ['$scope', function($scope) {
          if ($scope.shippingAddress === undefined) {
            $scope.shippingAddress = {
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
            $scope.$shippingAddressErrors = {};
            var data = angular.copy($scope.shippingAddress);
            data['country-id'] = data.country.id;
            delete data.country;
            data['state-id'] = data.state.id;
            delete data.state;
            Address.validateShippingAddressNew(data)
              .then(function() {
                $scope.isShippingAddressValidated = true;
              })
              .catch(function(failures) {
                angular.forEach(failures, function(failiure) {
                  $scope.form['shipping-' + failiure.field].$setValidity('validated', false);
                  invalidFields.push($scope.form['shipping-' + failiure.field]);
                });
                $scope.$shippingAddressErrors = failures;
                $scope.isShippingAddressValidated = false;
              });
          });
          $scope.useHomeAddress = function() {
            if ($scope.shippingIsUseHomeAddress) {
              angular.forEach($scope.homeAddressSource, function(value, key) {
                if ($scope.shippingAddress[key] !== undefined) {
                  $scope.shippingAddress[key] = value;
                }
              });
            } else {
              angular.forEach($scope.shippingAddress, function(value, key) {
                $scope.shippingAddress[key] = '';
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
        templateUrl: 'bower_components/2ViVe/views/miioon/billing-address.html',
        scope: {
          homeAddressSource: '=',
          billingAddress: '=',
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

          var invalidFields = [];
          $scope.$on('remoteValidate', function() {
            angular.forEach(invalidFields, function(invalidField) {
              invalidField.$setValidity('validated', true);
            });
            invalidFields = [];
            $scope.$billingAddressErrors = {};
            var data = angular.copy($scope.billingAddress);
            data['country-id'] = data.country.id;
            delete data.country;
            data['state-id'] = data.state.id;
            delete data.state;
            Address.validateBillingAddressNew($scope.billingAddress)
              .then(function() {
                $scope.isBillingAddressValidated = true;
              })
              .catch(function(failures) {
                angular.forEach(failures, function(failiure) {
                  $scope.form['billing-' + failiure.field].$setValidity('validated', false);
                  invalidFields.push($scope.form['billing-' + failiure.field]);
                });
                $scope.$billingAddressErrors = failures;
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
