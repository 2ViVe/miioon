'use strict';

angular.module('miioon/party')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$location', 'types', 'Events',
    function($scope, events, $route, $location, types, Events) {
      var type = $route.current.params.type;

      function handleRemarks(event) {
        var startTime = moment(event.startTime);
        var content = '<a href="#/meet/' + event.id + '">' + event.title + '</a>';
        if ($scope.remarks[startTime.year()] === undefined) {
          $scope.remarks[startTime.year()] = {};
        }
        if ($scope.remarks[startTime.year()][startTime.month()] === undefined) {
          $scope.remarks[startTime.year()][startTime.month()] = {};
        }
        if ($scope.remarks[startTime.year()][startTime.month()][startTime.date()] === undefined) {
          $scope.remarks[startTime.year()][startTime.month()][startTime.date()] = {
            class: 'has-event',
            content: content,
            type: 'tooltip-html-unsafe',
            appendToBody: 'false',
            trigger: 'click'
          };
        } else {
          var remark = $scope.remarks[startTime.year()][startTime.month()][startTime.date()];
          remark.content += '<br>' + content;
        }
      }

      if (events.length === 0) {
        $location.path('/meet/overview');
      }

      //change type to upcoming as default
      if (type !== 'upcoming' && type !== 'recent') {
        type = 'upcoming';
      }

      $scope.types = types;
      $scope.currentType = types[0];
      $scope.changeType = function(type) {
        $scope.currentType = type;
        Events.fetchAll({
          typeId: type.id
        }).then(function(events) {
          $scope.parties = events;
        });
      };

      $scope.remarks = {};

      angular.forEach(events, handleRemarks);

      $scope.parties = events;

      $scope.type = type;

    }]);