'use strict';

angular
  .module('miioon/genealogy')
  .controller('GenealogyController', ['$scope', 'genealogy', '$timeout',
    function($scope, genealogy, $timeout) {
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

      $scope.distributorExtraInfo = function() {
        var info = [];
        if (genealogy.data.active) {
          info.push('Active: ' + genealogy.data.active);
        }
        if (genealogy.data.userName) {
          info.push('Username: ' + genealogy.data.userName);
        }
        if (genealogy.data.renewelDate) {
          info.push('Renewal Date: ' + genealogy.data.renewelDate);
        }
        return info.join('<br>');
      };

      $scope.changeRootDistributor = refresh;

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