'use strict';

angular.module('miioon/party')
  .controller('PartyEditController', ['$scope', 'country', 'event', '$location', 'events', '$timeout',
    function($scope, country, event, $location, events, $timeout) {
      $scope.country = country;
      $scope.error = '';
      $scope.submitted = false;
      $scope.data = event.data;
      $scope.data.typeId = event.data.type.id;
      $scope.time = event.getTime();
      $scope.types = events.types;
      $scope.isEditing = true;
      $scope.isStarted = event.isStarted();

      $scope.templates = events.getTemplatesByTypeId($scope.data.typeId);

      $scope.times = [];
      for (var hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          $scope.times.push('0' + hour + ':00');
        } else {
          $scope.times.push(hour + ':00');
        }
      }

      var selectedTemplateIndex = events.getTemplateIndexById($scope.data.template.id);
      $timeout(function() {
        $scope.goToSlide(selectedTemplateIndex + 1);
      }, 1000);

      $scope.selectedTemplate = $scope.templates[selectedTemplateIndex];

      $scope.changeType = function() {
        $scope.templates = events.getTemplatesByTypeId($scope.data.typeId);
        selectedTemplateIndex = 0;
        $scope.selectedTemplate = $scope.templates[selectedTemplateIndex];
        $scope.refreshSlider();
      };

      $scope.nextTemplate = function() {
        if (selectedTemplateIndex === $scope.templates.length - 1) {
          selectedTemplateIndex = 0;
        } else {
          selectedTemplateIndex++;
        }
        $scope.selectedTemplate = $scope.templates[selectedTemplateIndex];
        $scope.nextSlide();
      };

      $scope.previousTemplate = function() {
        if (selectedTemplateIndex === 0) {
          selectedTemplateIndex = $scope.templates.length - 1;
        } else {
          selectedTemplateIndex--;
        }
        $scope.selectedTemplate = $scope.templates[selectedTemplateIndex];
        $scope.previousSlide();
      };

      $scope.cancel = function() {
        $location.path('/meet/' + event.data.id);
      };

      $scope.save = function() {
        $scope.submitted = true;

        if ($scope.form.$valid) {
          $scope.data.templateId = $scope.selectedTemplate.id;
          event.edit($scope.data, $scope.time)
            .then(function(event) {
              $location.path('/meet/' + event.data.id);
            })
            .catch(function(response) {
              $scope.error = response.data.meta.error.message;
            });
        }

      };
    }]);
