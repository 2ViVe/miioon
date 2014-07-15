'use strict';

angular.module('miioon/party')
  .controller('PartyEditController', ['$scope', '$modal', 'country', 'Event', 'types', 'templates', '$location', 'event',
    function($scope, $modal, country, Event, types, templates, $location, event) {
      $scope.templates = templates;
      $scope.country = country;
      $scope.error = '';
      $scope.submitted = false;
      $scope.data = event.data;
      $scope.data.typeId = event.data.type.id;
      $scope.time = event.getTime();
      $scope.types = types;

      $scope.times = [];
      for (var hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          $scope.times.push('0' + hour + ':00');
        } else {
          $scope.times.push(hour + ':00');
        }
      }

      var selectedTemplateIndex = 0;

      $scope.nextTemplate = function() {
        if (selectedTemplateIndex === templates.length - 1) {
          selectedTemplateIndex = 0;
        } else {
          selectedTemplateIndex++;
        }
      };

      $scope.previousTemplate = function() {
        if (selectedTemplateIndex === 0) {
          selectedTemplateIndex = templates.length - 1;
        } else {
          selectedTemplateIndex--;
        }
      };

      $scope.cancel = function() {
        $location.path('/meet/' + event.data.id);
      };

      $scope.save = function() {
        $scope.submitted = true;
        $scope.data.templateId = templates[selectedTemplateIndex].id;
        event.edit($scope.data, $scope.time)
          .then(function(event) {
            $location.path('/meet/' + event.data.id);
          })
          .catch(function(response) {
            $scope.error = response.data.meta.error.message;
          });
      };
    }]);
