angular
  .module('fto/signup')
  .controller('QuickSignupCtrl', ['$scope', '$http', 'Dashlize', 'CamelCaseLize',function($scope, $http, dashlize, camelize) {
    $scope.$errors = {};

    $scope.account = {

    };

    $scope.address = {
      home: {},
      shipping: {}
    };

    function mergeAddress(address) {
      address.countryId = address.country.id;
      address.stateId = address.state.id;

      delete address.country;
      delete address.state;
    }

    $scope.create = function() {
      $scope.isProcessing = true;

      var account = {};
      var homeAddress = {};
      var shippingAddress = {};
      angular.extend(account, $scope.account);
      angular.extend(homeAddress, $scope.address.home);
      angular.extend(shippingAddress, $scope.address.shipping);

      mergeAddress(homeAddress);
      mergeAddress(shippingAddress);

      account.homeAddress = homeAddress;
      account.shippingAddress = shippingAddress;

      $http
        .post('/api/v2/registrations/distributors-without-order', account, {
          transformRequest: function(data) { return angular.toJson(dashlize(data)); },
          transformResponse: camelize
        })
        .then(function() {
          $scope.isProcessing = false;
        })
        .catch(function(resp) {
          debugger;
          if (resp.status === 400) {
            var error = resp.data.meta.error;
            $scope.$errors[error.errorCode] = error.message;
          }
          $scope.isProcessing = false;
        })

    };
  }]);
