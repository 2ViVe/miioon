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
  .directive('signUpStep1',
  function() {
    return {
      restrict: 'C',
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
  })
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
  .directive('sponsorIdValidator', ['Registration',
    function(Registration) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          angular.element(element).on('blur', function() {
            Registration.validateSponsor(scope[attrs.ngModel])
              .success(function() {
                ctrl.$setValidity('validated', true);
              })
              .error(function() {
                ctrl.$setValidity('validated', false);
              });
          });
        }
      };
    }])
  .directive('homeAddress', [
    function() {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/home-address.html',
        scope: {
          homeAddress: '=',
          submitted: '=',
          form: '='
        }
      }
    }])
  .directive('webAddress', [
    function() {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/web-address.html',
        scope: {
          webAddress: '=',
          submitted: '=',
          form: '='
        }
      }
    }])
  .directive('shipmentAddress', [
    function() {
      return {
        restrict: 'A',
        templateUrl: 'views/sign-up/shipment-address.html',
        scope: {
          shipmentAddress: '=',
          submitted: '=',
          form: '='
        }
      }
    }]);