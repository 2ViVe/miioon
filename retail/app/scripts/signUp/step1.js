'use strict';

angular.module('miioon/signup')
  .directive('signUpStep1', [function() {
    return {
      restrict: 'C',
      controller: ['$scope', function($scope) {
        $scope.debug = function() {
          $scope.account.sponsor = '100001';
          $scope.account.login = 'test' + Math.random().toString().substr(15);
          $scope.account.password = '!QAZ2w';
          $scope.account.email = $scope.account.login + '@gmail.com';
        };

//        $scope.debug();

        $scope.$watch('account.login', function(login) {
          $scope.account.login = login ? login.toLowerCase() : login;
        });

        $scope.nextStep = function() {
          $scope.submitted = true;
          if (this.step1.$valid) {
            $scope.goToNextStep();
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
          if (isViewedTermAndCondition) {
            $element.find('#is-agreed').removeAttr('disabled');
          }
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
  }]);

