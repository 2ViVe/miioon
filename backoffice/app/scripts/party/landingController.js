'use strict';

angular.module('miioon/party')
  .controller('PartyLandingController', ['$scope', 'events', '$route', '$location', 'types',
    function($scope, events, $route, $location, types) {
      var period = $route.current.params.period;
      var currentTypeId = $route.current.params.typeId;
      angular.forEach(types, function(type) {
        if (type.id === currentTypeId) {
          $scope.currentType = type;
        }
      });

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

      $scope.types = types;
      $scope.changeType = function(type) {
        $location.path('/meet/overview/' + $scope.period + '/' + type.id);
      };
      $scope.switchPeriod = function(period) {
        var nextPeriod = period === 'recent' ? 'upcoming' : 'recent';
        $location.path('/meet/overview/' + nextPeriod + '/' + $scope.currentType.id);
      };

      $scope.remarks = {};

      angular.forEach(events, handleRemarks);

      $scope.parties = events;

      $scope.period = period;

    }]);