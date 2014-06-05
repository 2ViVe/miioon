'use strict';

angular.module('2ViVe')
  .factory('Email', ['$http', 'LocalStorage', '$location', '$q', 'DEFAULT_ROLE_CODE',
    function($http, LocalStorage, $location, $q, DEFAULT_ROLE_CODE) {
      var Email = {
        send: function(code){
          var url = '/api/v2/giftcards/' + code + '/emails';
          return $http.post(url, {
          }).then(function(response) {
            return response.data;
          });
        }
      };
      return Email;
    }]);