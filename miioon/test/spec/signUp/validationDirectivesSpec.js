'use strict';

describe('Validation Directives', function() {

  var when = describe,
      $compile,
      $scope,
      Reg,
      deferred,
      promise,
      form,
      el,
      markup;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($rootScope, _$compile_, Registration, $q) {
    deferred = $q.defer();
    promise = deferred.promise;
    $compile = _$compile_;
    $scope = $rootScope.$new();
    Reg = Registration;

    promise.success = function(fn) {
      promise.then(function(data) {
        fn(data);
      });
      return promise;
    };

    promise.error = function(fn) {
      return deferred.promise.catch(fn);
    };

    spyOn(Registration, 'validateSponsor').andReturn(deferred.promise);
  }));

  beforeEach(function() {

    $scope.sponsorNameBleh = 'Im sponsor';
    $scope.sponsorErrorMsg = 'THIS IS SPONSOR ERROR MSG';

    markup = '' +
    '<form name="form">' +
      '<input type="text" name="sponsor" ng-model="sponserId" ng-model-options="{ updateOn: \'blur\' }" sponsor-validator sponsor-name="sponsorNameBleh" sponsor-validator-error-msg="sponsorErrorMsg"/>' +
    '</form>';

    form = angular.element(markup);
    compileSponsorDirective();
  });

  describe('Sponser Validator', function() {

    when('user stop input the text to sponser field', function() {

      it('should not validate the sponser when there\'s no value in the input', function() {
        $scope.$digest();
        expect(Reg.validateSponsor.called).toBeFalsy();
      });

      it('should validate the sponser when there\'s value in the input', function() {
        $scope.sponserId = '1234';
        $scope.$digest();
        expect(Reg.validateSponsor).toHaveBeenCalledWith('1234');
      });

    });

    when('remote validate success', function() {

      var data;

      beforeEach(function() {
        data = {
          response: { name: 'kidd' }
        };
      });

      beforeEach(inject(function($rootScope) {
        $scope.sponserId = '1234';
        $scope.$digest();
        deferred.resolve(data);
        $rootScope.$apply();
      }));

      it('should set the isolate scope sponsor name with the remote data given', function() {
        expect($scope.sponsorNameBleh).toBe('kidd');
      });

      it('also validate this field', function() {
        expect(form.sponsor.$valid).toBeTruthy();
        expect(form.sponsor.$error.sponsorError).toBeFalsy();
      });

    });

    when('remote validate failed', function() {
      var data;

      beforeEach(function() {
        data = {
          meta: {
            error: { message: 'sponsor error' }
          }
        };
      });

      beforeEach(inject(function($rootScope) {
        $scope.sponserId = '1234';
        $scope.$digest();
        deferred.reject(data);
        $rootScope.$apply();
      }));

      it('should invalide this field', function() {
        expect(form.sponsor.$valid).toBeFalsy();
        expect(form.sponsor.$error.sponsorError).toBeTruthy();
      });

      it('should have sponsor error message in the scope', function() {
        expect($scope.sponsorErrorMsg).toBe('sponsor error');
      });
    });
  });

  function compileSponsorDirective() {
    el = $compile(form)($scope);
    $scope.$digest();
    form = $scope.form;
  }
});