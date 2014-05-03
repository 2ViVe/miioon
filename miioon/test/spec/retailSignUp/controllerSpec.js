'use strict';

describe('RetailSignUpCtrl', function() {

  var scope,
      Reg,
      deferred,
      when = describe;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($controller, $rootScope, $location, Registration, Address, $q) {
    var User = {};
    User.login = jasmine.createSpy().andReturn({ success: function() {} });
    scope = $rootScope.$new();
    Reg = Registration;
    deferred = $q.defer();


    spyOn(Reg, 'createRetail');
    spyOn(Reg, 'countries').andReturn([ { id: 123, states: [ { id: 123 } ] } ]);
    spyOn(Address, 'validateShippingAddressNew').andReturn(deferred.promise);

    $controller('RetailSignUpController', {
      $scope: scope,
      $location: $location,
      Registration: Reg,
      Address: Address,
      User: User,
      Taxons: {},
      Shopping: {},
      LocalStorage: {},
      countires: []
    });

    basicInfo(scope);
    shippingInfo(scope);

  }));

  when('register a new retail user', function() {

    beforeEach(inject(function($rootScope) {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = true;
      scope.register();
      deferred.resolve([]);
      $rootScope.$apply();
    }));

    it('should try to create a retail user', function() {
      expect(Reg.createRetail).toHaveBeenCalled();
    });

  });

  when('input data is not valid', function() {

    beforeEach(function() {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = false;
    });

    it('should not create a retail user', function() {
      scope.register();
      expect(Reg.createRetail).not.toHaveBeenCalled();
    });

  });


  when('already fullfill the valid data', function() {
    beforeEach(inject(function($rootScope) {
      scope.retailSignupForm = scope.retailSignupForm || {};
      scope.retailSignupForm.$valid = true;
      scope.register();
      deferred.resolve([]);
      $rootScope.$apply();
    }));

    beforeEach(function() {
      scope.register();
    });

    it('should use the datas to fill the form', function() {
      var shippingAddr = {
        'first-name': scope.firstName,
        'last-name': scope.lastName,
        'street': scope.firstAddressLine,
        'street-cont': scope.secondAddressLine,
        'city': scope.city,
        'zip': scope.zip,
        'state-id': scope.state.id,
        'country-id': scope.country.id,
        'phone': scope.phoneNumber
      };

      expect(Reg.createRetail).toHaveBeenCalledWith(scope.sponserId, scope.login, scope.password, scope.email, shippingAddr);
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