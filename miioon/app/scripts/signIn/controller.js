'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', '$location', 'User', 'Taxons', 'Shopping', 'LocalStorage',
    function($scope, $location, User, Taxons, Shopping, LocalStorage) {
      $scope.isRemember = false;

      $scope.signIn = function() {
        var isAlreadyLogin = User.isLogin;

        User.login($scope.username, $scope.password)
          .success(function() {
            //TODO: use session to identify user when node.js is ready
            User.remember();
//            if ($scope.isRemember) {
//              User.remember();
//            } else {
//              User.forget();
//            }
            User.fetch().success(function() {
              if (!isAlreadyLogin && Shopping.items) {
                Shopping.mergeItems();
              } else {
                Shopping.fetchForUser();
              }
            });
            Taxons.fetch();

            $location.path(LocalStorage.getPathAfterLogin());
            LocalStorage.removePathAfterLogin();
          });
      };
    }]);
