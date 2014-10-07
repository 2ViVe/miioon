'use strict';

describe('Address Service', function() {

  var when = describe,
      AddressService,
      httpBackend;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($httpBackend, Address) {
    httpBackend = $httpBackend;
    AddressService = Address;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  when('server returns a good response', function() {

    var responseData;

    beforeEach(function() {
      responseData = {
        'response': {
          'billing': {
            'first-name': 'kidd',
            'last-name' : 'kai'
          }
        }
      };
    });

    beforeEach(function() {
      httpBackend.when('GET', '/api/v2/addresses').respond(responseData);
    });

    it('should transform the data key from dash to camel', function() {
      var data;

      AddressService
        .fetch()
        .then(function(resp) {
          data = resp;
        });

      httpBackend.flush();

      expect(data.billing.firstName).toEqual(responseData.response.billing['first-name']);
    });



  });

});