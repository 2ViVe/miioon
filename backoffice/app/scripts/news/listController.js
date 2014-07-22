'use strict';

angular.module('2ViVe')
  .controller('NewsListController', ['$scope', 'news', function($scope, news) {
    $scope.news = news.news.companyNews;
    $scope.offset = 0;
    $scope.curpage = 1;


    var updatePage = $scope.updatePage = function(reflash){
      news.fetch($scope.offset).then(function(reslut){
        $scope.news = reslut.news.companyNews;
        if (reflash) {
          $scope.offset = 0;
          $scope.curpage = 1;
          $scope.refreshPagination(reslut.news.meta.count);
        }
      });
    };

    updatePage(true);

    $scope.goToPage = function(page){
      $scope.curpage = page;
      $scope.offset = ($scope.curpage - 1) * 20 + 1;
      updatePage();
    };

  }]);