'use strict';

angular
  .module('miioon/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy', '$timeout', '$modal',
    function($scope, genealogy, $timeout, $modal) {
      function refresh(distributorId) {
        genealogy
          .fetchUniLevels(distributorId)
          .then(function() {
            $scope.refreshSlider();
            $scope.refreshPagination(genealogy.data.children.length);

            genealogy.fetchPath(distributorId)
              .then(function() {
                $scope.refreshPath();
                $timeout(function() {
                  $scope.refreshPathPagination(genealogy.path.length);
                }, 0);
              });
          });
      }

      $scope.genealogy = genealogy;

      $scope.changeRootDistributor = refresh;

      $scope.showRetails = function() {
        $modal.open({
          templateUrl: 'views/report/genealogy-retail.html',
          controller: 'GenealogyRetailController',
          resolve: {
            retails: function() {
              return genealogy.data.retailChildren;
            }
          }
        });
      };

      $scope.search = function() {
        if (!$scope.searchId) {
          return;
        }
        refresh($scope.searchId);
      };

      $scope.back = function() {
        var path = genealogy.path;
        if (path.length > 1) {
          refresh(path[path.length - 2]);
        }
      };
    }
  ]);