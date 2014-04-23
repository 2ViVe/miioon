'use strict';

describe('RetailSignUpCtrl', function() {

  var scope,
      Reg,
      when = describe;

  beforeEach(module('2ViVe'));


  beforeEach(inject(function($rootScope, $controller, Registration) {
    scope = $rootScope.$new();
    Reg = Registration;

    sinon.stub(Reg, 'createRetail');

    $controller('RetailSignUpController', {
      $scope: scope,
      Registration: Registration
    });
  }));

  afterEach(function() {
    Reg.createRetail.restore();
  });


  when('register a new retail user', function() {

    beforeEach(function() {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = true;
    });

    it('should create a retail user', function() {
      scope.register();
      expect(Reg.createRetail.called).toBeTruthy();
    });

  });

  when('input data is not valid', function() {

    beforeEach(function() {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = false;
    });

    it('should not create a retail user', function() {
      scope.register();
      expect(Reg.createRetail.called).toBeFalsy();
    });

  });


});