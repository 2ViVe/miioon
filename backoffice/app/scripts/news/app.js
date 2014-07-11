'use strict';

angular
  .module('miioon.news', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    '2ViVe',
    'ipCookie'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/news', {
          templateUrl: 'views/news/list.html',
          controller: 'NewsListController',
          resolve: {
            'news': ['News', function(News) {
              var news = new News();
              return news.fetch();
            }]
          }
        })
      .when('/news/:id', {
        templateUrl: 'views/news/detail.html',
        controller: 'NewsDetailController',
        resolve: {
            'news': ['News', '$route', function(News, $route) {
              var news = new News();
              return news.getById($route.current.params.id);
            }]
          }
      });
  }]);
