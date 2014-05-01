'use strict';

angular.module('2ViVe')
  .factory('GiftCard', ['$http',
    function($http) {
      return function() {
        var giftCard = this;
        giftCard.fetch = $http.get('/api/v2/products/18', {
          params: {
            'role-code': 'D',
            'country-id': 1213,
            'catalog-code': 'GC'
          }
        }).success(function(data) {
          giftCard.data = data.response;
        });
      };
    }]);
