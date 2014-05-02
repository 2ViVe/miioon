'use strict';


describe('Profile Service', function() {

  var when = describe,
      httpBackend,
      ProfileService;

  function respondWith(responseData, statusCode, method) {
    statusCode = statusCode || 200;
    method = method || 'GET';
    httpBackend.when(method, '/api/v2/profile').respond(statusCode, responseData);
  }

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($httpBackend, Profile) {
    httpBackend = $httpBackend;
    ProfileService = Profile;
  }));


  when('server returns a correct user profile', function() {
    var data = { 'user-id': 1234, name: 'xxx' };
    var response = { response: data };

    beforeEach(function() {
      respondWith(response, 200);
    });

    it('should fetch the correct user profile', function() {
      var profile;

      ProfileService
        .fetch()
        .then(function(data) {
          profile = data;
        });
      httpBackend.flush();

      expect(profile).toEqual({ userId: 1234, name: 'xxx' });
    });
  });

  when('there\s some err when fetching back the data', function() {
    beforeEach(function() {
      respondWith({}, 400);
    });

    it('should call the catch callback', function() {
      var mockCallBack = jasmine.createSpy();
      ProfileService
        .fetch()
        .catch(mockCallBack);

      httpBackend.flush();
      expect(mockCallBack).toHaveBeenCalled();
    });
  });


});