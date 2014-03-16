'use strict';

angular.module('2ViVe')
  .directive('abide',
  function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        angular.element(element).foundation();
      }
    };
  }).directive('signUpStep1',
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
  });