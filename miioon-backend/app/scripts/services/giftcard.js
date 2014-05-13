'use strict';

angular.module('2ViVe')
  .factory('GiftCards', ['$http', 'CamelCaseLize', function($http, camelcase) {

    function GiftCards() {}

    GiftCards.fetch = function() {
      return $http.get('/api/v2/giftcards', {
        transformResponse:  camelcase
      }).then(function(resp) {
        return resp.data.response;
      });
    };

    return GiftCards;
  }]);
