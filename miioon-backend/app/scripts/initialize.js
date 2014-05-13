'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', 'UrlHandler', 'Shopping',
    function(User, Profile, UrlHandler, Shopping) {
      Profile.fetch();
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          UrlHandler.goToRetailSite();
          return null;
        }
        Shopping.fetchForUser();
      }).catch(UrlHandler.goToRetailSite);
    }]);