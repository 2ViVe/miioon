angular.module('2ViVe', ['ngResource'])
  .factory('User', ['$resource', function($resource) {
    return $resource('http://127.0.0.1:2403/users/login', null,
      {
        'login': { method: 'POST' }
      });
  }]);