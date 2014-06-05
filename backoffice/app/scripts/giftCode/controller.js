'use strict';

angular.module('2ViVe')
  .controller('giftCodeCtrl', ['$scope', 'GiftCards', 'Email', function($scope, GiftCards, Email) {
    GiftCards.fetch().then(function(result) {
      $scope.giftcodes = result;
    });

    $scope.sendEmail = function(giftcard){
    	var code = giftcard.code;
    	Email.send(code).then(function(data){
    		$scope.reciEmail = data.response['recipient-email'];
    		$scope.success = data.response.success;
    		$scope.isSuccess = true;
    	});
    }

  }]);
