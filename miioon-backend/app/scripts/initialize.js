'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', '$window', 'UrlHandler', 'Shopping',
    function(User, Profile, $window, UrlHandler, Shopping) {
      function goToRetailSite() {
        $window.location.href = UrlHandler.retailUrl();
      }

      Profile.fetch();
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          goToRetailSite();
          return null;
        }
        Shopping.fetchForUser();
      }).catch(goToRetailSite);
    }]);