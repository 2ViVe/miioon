'use strict';

angular.module('2ViVe')
  .factory('News', ['$http', 'Dashlize', 'CamelCaseLize',
    function($http, dashlize, camelCaselize) {
      var News = function(limit) {
        this.limit = limit || 20;
      };
      News.prototype.fetch = function(offset){
        var news = this;
        return $http.get('/api/v1/company-news', {
          transformResponse: camelCaselize,
          params : {
            'offset' : offset || undefined,
            'limit' : this.limit
          }
        }).then(function(response) {
            news.news = response.data.response;
            return news;
          });
      };

      News.prototype.getById = function(id){
        return $http.get('/api/v1/company-news/' + id, {
          transformResponse: camelCaselize
        }).then(function(response) {
            return response.data.response;
          });
      };

      return News;
    }]);
