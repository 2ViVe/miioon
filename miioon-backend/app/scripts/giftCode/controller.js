angular.module('2ViVe')
  .controller('giftCodeCtrl', ['$scope', 'GiftCard', function($scope, GiftCard) {
    GiftCard.fetch().then(function(result) {
      console.log(result);
    });
  }]);
