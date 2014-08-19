'use strict';
angular.module('miioon/signup')
  .controller('RetailSignUpController', ['$scope', '$location', 'Address', 'Registration', 'User', 'Shopping',
    function($scope, $location, Address, Registration, User, Shopping) {
      $scope.submitted = false;
      $scope.errors = {};
      $scope.method = {
        shipping: {},
        payment: {}
      };

      $scope.address = Address.createContainer()
        .addType('shipping');

      $scope.$watch('account.login', function(login) {
        if ($scope.account) {
          $scope.account.login = login ? login.toLowerCase() : login;
        }
      });

      $scope.create = function() {
        $scope.errors = {};
        $scope.submitted = true;
        Registration.createRetail(
          $scope.account,
          $scope.address.shipping
        ).then(function() {
            return User.login($scope.account.login, $scope.account.password, true);
          }, function(resp) {
            var errors = null;
            if (400 === resp.status) {
              errors = resp.data.meta.error.data.failures;
              angular.forEach(errors, function(error) {
                $scope.errors[error.code] = error.message;
              });
              return false;
            }
          }).then(function(result) {
            if (!result) {
              return;
            }
            User.fetch().then(function() {
              if (Shopping.items) {
                return Shopping.mergeItems();
              } else {
                return Shopping.fetch();
              }
            }).then(function() {
              $location.path('/');
            });

          });
      };

    }]);

