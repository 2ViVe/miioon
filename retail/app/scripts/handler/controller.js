'use strict';

angular.module('2ViVe')
  .controller('handlerController', ['$scope', '$location', 'Handlers', 'Registration.Countries', function($scope, $location, Handlers, Countries) {
    $scope.submit = function(){
      Handlers.fetch($scope.microchipId, $scope.firstName, $scope.lastName, $scope.zipCode, $scope.stateId).then(function(results){
        $scope.results = results;
        $scope.errorMessage = '';
        if (results.length === 0){
          $scope.errorMessage = 'Handler Not Found';
        }
      });

    };
    $scope.changeHandler = function(handler){
      $scope.targetHandler = handler;
    };

    $scope.connect = function(){
      if ($scope.targetHandler !== '') {
        window.location.href = '/' + $scope.targetHandler.login;
      }
    };

    $scope.direct = function(handler){
      window.location.href = '/' + handler.login;
    };

    Countries.fetch().then(function(countries) {
      $scope.country = countries.data[0];
      $scope.states = $scope.country.states;
    });

    $scope.selectState = function(){
      $scope.stateId = $scope.state ? $scope.state.id : null;
    };

    $scope.results = [];
    $scope.targetHandler = '';
  }]);