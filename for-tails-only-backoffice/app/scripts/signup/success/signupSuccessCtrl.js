'use strict';

angular
  .module('fto/signup')
  .factory('signupResult', function() {
    var data = {};

    return {
      get: function() {
        var result = data;
        data = {};
        return result;
      },
      set: function(result) {
        data = result;
      }
    }
  })
  .controller('SignupSuccessCtrl', ['signupResult', function(result) {
    this.result = result.get();
  }]);
