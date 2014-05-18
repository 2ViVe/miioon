'use strict';

angular.module('2ViVe')
  .controller('HyperWalletController', ['$location', 'hyperwallet', function($location, hyperwallet) {
    var self = this;

    this.isLoading = true;

    this.init = function() {
      hyperwallet
        .fetch()
        .then(function(data) {
          self.data = data;
          self.isLoading = false;
        })
        .catch(function(resp) {
          if (resp.statusCode === 401) {
            return $location.path('/signin');
          }
          self.isLoading = false;
        });
    };

    this.init();
  }]);
