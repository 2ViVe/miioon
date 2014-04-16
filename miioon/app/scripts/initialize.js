'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', 'Taxons', function(User, Profile, Taxons) {
    if (User.isRememberedLogin()) {
      Profile.fetch();
    }
    Taxons.fetch();
  }]);