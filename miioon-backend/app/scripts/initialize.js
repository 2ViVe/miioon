'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', 'Shopping',
    function(User, Profile, Shopping) {
      Profile.fetch();
      User.fetch();
    }]);