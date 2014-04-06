'use strict';

angular.module('2ViVe')
  .factory('Product', ['$http', 'User',
    function($http, User) {
      var user = User.instance();
      return {
        taxons: function() {
          return $http.get('/api/v2/taxons', {
            headers: {
              'X-Authentication-Token': 'MTAxMjAxOjo0MDcyMzo6cHJlbWl1bTo6OjoxMzk2Nzc1MDczMTM4OjpabG5FbExORmpGdDZwT0JBT1FwSDhlOjpLMWZYRDZoSDhZRlo1Vi82d2NnZFdHeHd6T0kwVHBOT3NyVktQWTUyQXZNPQ=='
            }
          });
        }
      };
    }]);