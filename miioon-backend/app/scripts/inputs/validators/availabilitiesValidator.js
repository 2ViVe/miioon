angular.module('2ViVe')
  .directive('availabilitiesValidator', ['$http',
    function ($http) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          key: '@availabilitiesValidator',
          initValue: '=initValue'
        },
        link: function (scope, element, attrs, ctrl) {
          angular.element(element).on('blur', function () {
            var value = ctrl.$modelValue;

            if (ctrl.$isEmpty(value)) {
              return;
            }

            if (scope.initValue && scope.initValue.trim() === value.trim()) {
              ctrl.$setValidity('available', true);
              return;
            }

            function validateAvailabilities(key, value) {
              var params = {};
              params[key] = value;
              return $http.get('/api/v2/registrations/availabilities', {
                params: params
              });
            }

            validateAvailabilities(scope.key, value)
              .success(function (data) {
                ctrl.$setValidity('available', data.response.available);
              })
              .error(function () {
                ctrl.$setValidity('available', false);
              });
          });
        }
      };
    }]);
