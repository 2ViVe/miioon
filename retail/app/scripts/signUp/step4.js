'use strict';

angular.module('miioon/signup')
  .directive('signUpStep4', [function() {
    return {
      restrict: 'CA',
      controller: ['$scope', 'Registration', 'User', 'UrlHandler', function($scope, Registration, User, UrlHandler) {
        var lineItems = $scope.products.selection.map(function(product) {
          return {
            variantId: product.variantId,
            quantity: 1
          };
        });

        $scope.address.addType('billing');
        $scope.retailUrl = UrlHandler.retailUrl();
        $scope.creditcard = {};
        $scope.isProcessing = false;

        Registration.orderSummary(
          $scope.address.home.toJSON(),
          $scope.address.shipping.toJSON(),
          $scope.address.home.toJSON(),
          lineItems,
          $scope.address.website.toJSON())
          .success(function(data) {
            $scope.order = data.response;
            $scope.method.payment = $scope.order.availablePaymentMethods[0];
          });

        var shippingMethodId = $scope.method.shipping ? $scope.method.shipping.id : null;

        $scope.create = function() {
          $scope.paymentFailed = false;
          $scope.isProcessing = true;
          $scope.submitted = true;
          if (this.step4.$valid) {
            $scope.address.billing.validate().then(function() {
              Registration.create(
                $scope.method.payment.id,
                $scope.account,
                $scope.creditcard,
                $scope.address.home.toJSON(),
                shippingMethodId,
                $scope.address.shipping.toJSON(),
                $scope.address.billing.toJSON(),
                lineItems,
                $scope.address.website.toJSON())
                .success(function(data) {
                  $scope.isProcessing = false;
                  if (data.response.order.paymentState === 'failed') {
                    $scope.paymentFailed = true;
                    return;
                  }


                  $scope.goToSuccess(data.response);

                  User.login($scope.account.login, $scope.account.password)
                    .success(function() {
                      User.fetch();
                    });
                });
            });
          } else {
            $scope.isProcessing = false;
          }
        };
      }]
    };
  }]);