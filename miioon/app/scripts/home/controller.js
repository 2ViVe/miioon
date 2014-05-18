'use strict';

angular.module('2ViVe')
  .controller('HomeController', ['LocalStorage', '$location', function(LocalStorage, $location) {
    var owner = LocalStorage.getReplicateOwner();
    if (owner) {
      $location.path('/' + owner.login);
    }
  }]);
