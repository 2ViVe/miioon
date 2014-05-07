'use strict';

angular.module('miioonApp')
  .run(['User', 'Profile', '$window', 'UrlHandler',
    function(User, Profile, $window, UrlHandler) {
      Profile.fetch();
      User.fetch().then(function() {
        if (User.data.roleCode === 'R') {
          $window.location.href = UrlHandler.retailUrl();
        }
      }, function() {
        $window.location.href = UrlHandler.retailUrl();
      });
    }]);