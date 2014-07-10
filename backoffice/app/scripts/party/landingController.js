'use strict';

angular.module('miioon/party')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$location',
    function($scope, events, $route, $location) {
      var recentOutput = [],
        upcomingOutput = [],
        type = $route.current.params.type;

      function isRecent(endTime) {
        return moment(endTime).isBefore(new Date());
      }

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

      $scope.remarks = {};

      angular.forEach(events, function(event) {
        if (isRecent(event.endTime)) {
          recentOutput.push(event);
        } else {
          upcomingOutput.push(event);
        }

        handleRemarks(event);
      });

      if (type === 'upcoming') {
        $scope.parties = upcomingOutput;
      } else {
        $scope.parties = recentOutput;
      }

      $scope.type = type;

    }]);