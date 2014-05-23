'use strict';

angular.module('2ViVe')
  .controller('SignInController', ['$scope', 'UrlHandler', 'User', 'Taxons', 'Shopping', 'LocalStorage',
    function($scope, UrlHandler, User, Taxons, Shopping, LocalStorage) {
      var goToPreviousPath = function() {
        var pathAfterLogin = LocalStorage.getPathAfterLogin();
        LocalStorage.removePathAfterLogin();
        UrlHandler.goToBackOffice(pathAfterLogin);
      };

      $scope.isRemember = false;

      $scope.signIn = function() {
        $scope.isError = false;
        var isAlreadyLogin = User.isLogin;

        User.login($scope.username, $scope.password, $scope.isRemember)
          .success(function() {
            User.fetch().then(function() {
              if (!isAlreadyLogin && Shopping.items) {
                Shopping.mergeItems().success(goToPreviousPath);
              } else {
                Shopping.fetch().then(goToPreviousPath);
              }
            });
          })
          .error(function() {
            $scope.isError = true;
          });
      };
    }]);
