'use strict';

angular.module('2ViVe')
  .controller('giftCodeCtrl', ['$scope', 'GiftCards', function($scope, GiftCards) {
    GiftCards.fetch().then(function(result) {
      $scope.giftcodes = result;
    });

    $scope.sendEmail = function(giftcard){
    	var code = giftcard.code;
    	GiftCards.resendEmail(code).then(function(data){
    		$scope.isSuccess = true;
    	});
    }

  }]);
