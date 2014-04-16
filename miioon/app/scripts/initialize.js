'use strict';

angular.module('miioonApp')
  .constant('CLIENT_ID', 'ZlnElLNFjFt6pOBAOQpH8e')
  .config(['$httpProvider', 'CLIENT_ID',
    function($httpProvider, CLIENT_ID) {
      $httpProvider.defaults.headers.common = {
        'x-client-id': CLIENT_ID,
        'x-client-secret': 'HeFsCAvsXTzpHWAqRVWCibsUYlF7gjpLRUAUw551r'
      };
    }])
  .run(['User', 'Profile', 'Taxons', function(User, Profile, Taxons) {
    if (User.isRememberedLogin()) {
      Profile.fetch();
    }
    Taxons.fetch();
  }]);