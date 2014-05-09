angular.module('2ViVe')
  .factory('GiftCard', ['$http', 'CamelCaseLize', function($http, camelcase) {

    function GiftCard() {}

    GiftCard.fetch = function() {
      return $http.get('/api/v2/giftcards', {
        transformResponse:  camelcase
      }).then(function(resp) {
        return resp.data.response;
      });
    };

    return GiftCard;
  }]);
