angular.module('2ViVe')
  .factory('GiftCard', ['$http', function($http) {

    function GiftCard() {}

    GiftCard.fetch = function() {
      return $http.get('/api/v2/giftcards').then(function(resp) {
        return resp.data.response;
      });
    };

    return GiftCard;
  }]);
