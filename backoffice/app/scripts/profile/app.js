'use strict';

angular.module('2ViVe')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/account', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      resolve: {
        'profile': ['User', function(User) {
          return User.fetch();
        }],
        'address': ['Address', function(Address) {
          return Address.fetch();
        }]
      }
    });
  }]);
