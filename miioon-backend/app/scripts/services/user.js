'use strict';

angular.module('2ViVe')
  .factory('User', ['$http', 'LocalStorage', 'CamelCaseLize', 'Dashlize',
    function($http, LocalStorage, camelCaseLize, dashlize) {

      var useCache = false;

      function UserModel(data) {
        angular.extend(this, data);
      }

      var proto = UserModel.prototype;

      proto.save = function() {
        var self = this;
        useCache = false;
        return $http.post('/api/v2/profile', this, {
          transformRequest: function(data)  { return angular.toJson(dashlize(data)); },
          transformResponse: camelCaseLize
        }).then(function() { return self; });
      };

      var User = {
        isLogin: false,
        login: function(username, password, isRemember) {
          return $http.post('/authentication/token', {
            user: username,
            password: password,
            'remember-me': isRemember
          }).success(function() {
            LocalStorage.removeVisitorId();
            User.isLogin = true;
          });
        },
        logout: function() {
        },
        fetch: function() {
          return $http.get('/api/v2/profile', {
                    transformResponse: camelCaseLize,
                    cache: useCache
                  })
                  .success(function(data) {
                    User.data = new UserModel(data.response);
                    User.isLogin = true;
                    useCache = true;
                  }).then(function(resp) {
                    return new UserModel(resp.data.response);
                  });
        }
      };
      return User;
    }]);