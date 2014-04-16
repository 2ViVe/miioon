'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', function(User, Profile) {
    if (User.isRememberedLogin()) {
      Profile.fetch();
    }
  }]);