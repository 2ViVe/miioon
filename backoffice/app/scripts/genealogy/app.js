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
              40: 1,
              50: 2,
              60: 3,
              70: 4,
              80: 5
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
