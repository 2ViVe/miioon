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

        function updateContinueButton() {
          if (isViewedTermAndCondition && isAgreementChecked) {
            $element.find('button').removeAttr('disabled');
          }
        }

        $element.find('#term-condition').on('scroll', function() {
          isViewedTermAndCondition = (this.scrollTop + this.offsetHeight) > this.scrollHeight;
          updateContinueButton();
        });
        $element.find('#is-agreed').on('change', function() {
          isAgreementChecked = angular.element(this).is(':checked');
          updateContinueButton();
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
        var firstPassword = attrs.equalTo;
        angular.element(element).on('keyup', function() {
          scope.$apply(function() {
            var isEqual = element.val() === angular.element(firstPassword).val();
            ctrl.$setValidity('equalTo', isEqual);
          });
        });
      }
    };
  });