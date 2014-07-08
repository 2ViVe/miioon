'use strict';

angular
  .module('miioon/genealogy', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ui.utils',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/genealogy', {
        templateUrl: 'views/report/genealogy.html',
        controller: 'GenealogyController',
        resolve: {
          genealogy: ['Genealogy', function(Genealogy) {
            var genealogy = new Genealogy({
              '': 0,
              50: 1,
              60: 2,
              70: 3,
              80: 4,
              90: 5
            });
            return genealogy
              .fetchUniLevels()
              .then(function() {
                return genealogy.fetchPath(genealogy.data.id);
              }).then(function() {
                return genealogy;
              });
          }]
        }
      });
  }]);
