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

    basicInfo(scope);
    shippingInfo(scope);

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


  when('already fullfill the valid data', function() {
    beforeEach(function() {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = true;
    });

    beforeEach(function() {
      scope.register();
    });

    it('should use the sponsor data to fill the form', function() {
      expect(Reg.createRetail.args[0][0]).toBe(scope.sponsor);
    });

    it('should use the login data to fill the form', function() {
      expect(Reg.createRetail.args[0][1]).toBe(scope.login);
    });

    it('should use the password data to fill the form', function() {
      expect(Reg.createRetail.args[0][2]).toBe(scope.password);
    });

    it('should use the email data to fill the form', function() {
      expect(Reg.createRetail.args[0][3]).toBe(scope.email);
    });

    it('should use the shipping address data to fill the form', function() {
      expect(Reg.createRetail.args[0][4]).toEqual({
        'first-name': scope.firstName,
        'last-name': scope.lastName,
        'stree': scope.firstAddressLine,
        'stree-cont': scope.secondAddressLine,
        'city': scope.city,
        'zip': scope.zip,
        'state-id': scope.state.id,
        'country-id': scope.city.id,
        'phone': scope.phoneNumber
      });
    });

  });


  function basicInfo(scope) {
    scope.sponsor = '100001';
    scope.login = 'kiddkai';
    scope.email = 'kiddkai@gmail.com';
    scope.password = 'zekaipass';
  }

  function shippingInfo(scope) {
    scope.firstName = 'kidd';
    scope.lastName = 'kai';
    scope.phoneNumber = '123456';
    scope.firstAddressLine = 'line one';
    scope.secondAddressLine = 'line 2';
    scope.city = 'Chicago';
    scope.country = {id: 234};
    scope.state = {id: 123};
    scope.zip = '123';
  }
});