'use strict';

var downloadUrlPrefix = '/documents/tools/',
  viewUrlPrefix = '/downloads/documents/tools/';

angular.module('2ViVe')
  .controller('TrainController', ['$scope', 'Tools', function($scope, Tools) {
    Tools.fetch().then(function(result) {
      var filesArr = {};
      
      angular.forEach(result, function (files, folderName) {
        filesArr[folderName] = [];
        angular.forEach(files,function (filename, index) {
          var item = {};
          item.type = /[^.]+$/.exec(filename)[0] || '';
          item.canView = false;
          if (item.type.toLocaleLowerCase() === 'pdf') {
            item.canView = true;
          }
          item.downloadUrl = downloadUrlPrefix + filename;
          item.viewUrl = viewUrlPrefix + filename;
          item.filename = filename;
          filesArr[folderName].push(item);
        });
      });
      $scope.filesArr = filesArr;
    });
  }]);