'use strict';

angular.module('miioonApp')
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider',
    function($httpProvider) {
      $httpProvider.interceptors.push('HttpInterceptor');
    }])
  .run(['User', 'Profile', 'Taxons', 'Shopping',
    function(User, Profile, Taxons, Shopping) {
      if (User.isRememberedLogin()) {
        Profile.fetch().success(function() {
          Shopping.fetchForUser();
        });
      } else {
        Shopping.fetchForVisitor();
      }
      Taxons.fetch();
    }]);