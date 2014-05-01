'use strict';

angular.module('miioonApp')
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider',
    function($httpProvider) {
      $httpProvider.interceptors.push('HttpInterceptor');
    }])
  .run(['User', 'Taxons', 'Shopping',
    function(User, Taxons, Shopping) {
      User.fetch().success(function() {
        Shopping.fetchForUser();
      }).error(function() {
        Shopping.fetchForVisitor();
      });
      Taxons.fetch();
    }]);