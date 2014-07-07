'use strict';

angular.module('2ViVe')
  .controller('giftCodeCtrl', ['$scope', 'giftcodes', 'GiftCards', function($scope, giftcodes, GiftCards) {
    $scope.giftcodes = giftcodes;

    $scope.sendEmail = function(giftcard){
    	var code = giftcard.code;
    	GiftCards.resendEmail(code).then(function(data){
        $scope.isSuccess = data.response.success;
        $scope.reciEmail = data.response.recipientEmail;
    	});
    }
  }]);
