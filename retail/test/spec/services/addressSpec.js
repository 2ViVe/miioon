'use strict';

describe('Address Service', function() {

  var when = describe,
      addr,
      httpBackend;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function ($httpBackend, Address) {
    httpBackend = $httpBackend;
    addr = Address;
  }));

  when('validate the shipping', function() {

    function respondWith(responseData, statusCode) {
      statusCode = statusCode || 200;
      httpBackend.when('POST', '/api/v2/addresses/shipping/validate').respond(statusCode, responseData);
    }

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    when('there\'s no errors from remote server', function() {
      beforeEach(function () {
        respondWith({ response: { failures: [] } });
      });

      it('should invoke the validate callback', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .then(callback);

        httpBackend.flush();

        expect(callback).toHaveBeenCalled();
      });

      it('should not invoke the validate callback when there are no result yet', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .then(callback);

        expect(callback).not.toHaveBeenCalled();
        httpBackend.flush();
      });


      it('should not call the invalid callback', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .catch(callback);

        httpBackend.flush();
        expect(callback).not.toHaveBeenCalled();
      });
    });

    when('there are some errors from remote server', function() {
      beforeEach(function () {
        respondWith({ response: { failures: [ {
          code: 'invalidAddress',
          message: 'some message'
        } ] } });
      });

      it('should invoke the invalid callback', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .catch(callback);

        httpBackend.flush();
        expect(callback).toHaveBeenCalled();
      });

      it('should parse the failure object to normal key/value pair', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .catch(callback);

        httpBackend.flush();
        expect(callback).toHaveBeenCalledWith({
          invalidAddress: 'some message'
        });
      });
    });

    when('there\'s a response error from remote server', function() {
      beforeEach(function () {
        respondWith({}, 404);
      });

      it('should invoke the invalid callback', function() {
        var callback = jasmine.createSpy();

        addr
          .validateShippingAddressNew({})
          .catch(callback);

        httpBackend.flush();
        expect(callback).toHaveBeenCalled();
      });
    });


  });


});
