'use strict';

angular.module('2ViVe')
  .controller('ShippingController', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      console.log($scope);

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]
);



