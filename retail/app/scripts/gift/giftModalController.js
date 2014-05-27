'use strict';

angular.module('2ViVe')
  .controller('GiftModalController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);



