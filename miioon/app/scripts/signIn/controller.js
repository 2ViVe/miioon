'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', '$location', 'User', 'Taxons', 'Shopping', 'LocalStorage',
    function($scope, $location, User, Taxons, Shopping, LocalStorage) {
      var goToPreviousPath = function() {
        $location.path(LocalStorage.getPathAfterLogin());
        LocalStorage.removePathAfterLogin();
      };

      $scope.isRemember = false;

      $scope.signIn = function() {
        var isAlreadyLogin = User.isLogin;

        User.login($scope.username, $scope.password, $scope.isRemember)
          .success(function() {
            User.fetch().success(function() {
              if (!isAlreadyLogin && Shopping.items) {
                Shopping.mergeItems().success(goToPreviousPath);
              } else {
                Shopping.fetchForUser().success(goToPreviousPath);
              }
            });
          });
      };
    }]);
