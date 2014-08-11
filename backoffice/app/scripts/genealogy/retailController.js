'use strict';

angular
  .module('miioon/genealogy')
  .controller('GenealogyRetailController', ['$scope', '$modalInstance', 'retails',
    function($scope, $modalInstance, retails) {

      $scope.retails = retails;

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);