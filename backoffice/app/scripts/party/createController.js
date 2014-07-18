'use strict';

angular.module('miioon/party')
  .controller('PartyCreateController', ['$scope', 'country', 'Event', '$location', 'events',
    function($scope, country, Event, $location, events) {
      $scope.country = country;
      $scope.error = '';
      $scope.submitted = false;
      $scope.time = {};
      $scope.data = {
        address: {
          countryIso: country.iso,
          countryName: country.name
        },
        typeId: events.types[0].id
      };
      $scope.types = events.types;
      $scope.templates = events.getTemplatesByTypeId(events.types[0].id);

      $scope.times = [];
      for (var hour = 0; hour < 24; hour++) {
        if (hour < 10) {
          $scope.times.push('0' + hour + ':00');
        } else {
          $scope.times.push(hour + ':00');
        }
      }

      var selectedTemplateIndex = 0;
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
        $location.path('/meet/overview/upcoming');
      };

      $scope.save = function() {
        $scope.submitted = true;
        $scope.data.templateId = $scope.selectedTemplate.id;
        $scope.data.template = $scope.selectedTemplate;
        var event = new Event();
        event.create($scope.data, $scope.time)
          .then(function(event) {
            $location.path('/meet/' + event.data.id + '/invite');
          })
          .catch(function(response) {
            $scope.error = response.data.meta.error.message;
          });
      };
    }]);
