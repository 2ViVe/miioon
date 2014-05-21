'use strict';

angular.module('2ViVe')
  .controller('HyperWalletController', ['$q', '$location', 'hyperwallet', function($q, $location, hyperwallet) {
    var self = this;

    this.isLoading = true;

    function checkIfWalletExists() {
      var deferred = $q.defer();
      hyperwallet
        .fetch()
        .then(function(data) {
          self.isLoading = false;
          if (data.responseCode === 'succeeded') {
            self.hasHyperWallet = true;
            deferred.resolve(true);
          }
          else {
            self.hasHyperWallet = false;
            deferred.reject(data.responseCode);
          }
        }, function(resp) {
          if (resp.statusCode === 401) {
            return $location.path('/signin');
          }
          self.isLoading = false;
          self.loadFailed = true;
        });
      return deferred.promise;
    }

    this.init = function() {
      self.loadFailed = false;
      checkIfWalletExists()
        .then(function() {
          return hyperwallet.details();
        })
        .then(function(data) {
          self.data = data;
        })
        .catch(function() {
          self.loadFailed = true;
        });
    };

    this.init();
  }]);
