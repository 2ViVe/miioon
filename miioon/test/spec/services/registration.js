'use strict';

describe('Registration', function() {

  var httpBackend,
      Reg,
      us,
      countries,
      states;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($httpBackend, Registration) {
    httpBackend = $httpBackend;
    Reg = Registration;
  }));

  beforeEach(function () {
    states = [
      {
        id: 10174,
        name: 'Buckinghamshire',
        abbr: 'BKM'
      },
      {
        id: 10175,
        name: 'Cambridgeshire',
        abbr: 'CAM'
      }
    ];
    us = { id: 123, states: states};
    countries = [us];

    httpBackend.when('GET', '/api/v2/registrations/countries').respond({ response: countries });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#countries', function() {

    it('should call the api', function() {
      var countries = Reg.countries();
      httpBackend.flush();
      expect(countries[0]).toEqual(us);
    });

    it('should always return the same countries', function() {
      expect(Reg.countries()).toBe(Reg.countries());
      httpBackend.flush();
    });

  });

});