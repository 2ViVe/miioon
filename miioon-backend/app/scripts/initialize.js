'use strict';

angular.module('miioonApp')
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider',
    function($httpProvider) {
      $httpProvider.interceptors.push('HttpInterceptor');
    }])
  .run(['User', 'Profile', 'Shopping',
    function(User, Profile, Shopping) {
      Profile.fetch().success(function() {
        Shopping.fetchForUser();
      });
    }]);