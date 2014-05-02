'use strict';

angular.module('2ViVe')
  .factory('LocalStorage', ['$cookies', 'UUID',
    function($cookies, UUID) {
      var _token;
      return {
        createVisitorId: function() {
          $cookies.visitorId = UUID.generate();
          return $cookies.visitorId;
        },
        isVisitorIdSaved: function() {
          return $cookies.visitorId;
        },
        removeVisitorId: function() {
          $cookies.visitorId = '';
        },
        getVisitorId: function() {
          return $cookies.visitorId;
        },
        getToken: function() {
          return $cookies.token ? $cookies.token : _token;
        },
        setToken: function(token) {
          _token = token;
        },
        saveToken: function(token) {
          $cookies.token = token;
        },
        isTokenSaved: function() {
          return $cookies.token;
        },
        removeToken: function() {
          $cookies.token = '';
        },
        setPathAfterLogin: function(path) {
          $cookies.pathAfterLogin = path;
        },
        getPathAfterLogin: function() {
          return $cookies.pathAfterLogin ? $cookies.pathAfterLogin : '/';
        },
        removePathAfterLogin: function() {
          $cookies.pathAfterLogin = '';
        },
        setPathToContinueShopping: function(path) {
          $cookies.pathToContinueShopping = path;
        },
        getPathToContinueShopping: function() {
          return $cookies.pathToContinueShopping ? $cookies.pathToContinueShopping : '/';
        },
        removePathToContinueShopping: function() {
          $cookies.pathToContinueShopping = '';
        }
      };
    }]);