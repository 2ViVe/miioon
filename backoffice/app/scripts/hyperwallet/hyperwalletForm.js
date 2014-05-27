'use strict';

angular.module('2ViVe')
  .directive('hyperwalletForm', [function() {
    return {
      restrict: 'A',
      replace: true,
      controller: ['$scope', '$q', 'User', 'Address', 'hyperwallet', 'Registration',function($scope, $q, User, Address, hyperwallet, Registration) {
        var self = this;
        this.data = {};

        $q.all({
          user: User.fetch(),
          address: Address.fetch(),
          countries: Registration.countries()
        }).then(function(data) {
          self.user = data.user;
          self.address = data.address.home;
          self.countries = data.countries;
          self.init();
        });

        this.init = function() {
          this.data.notificationEmail = this.user.email;
          this.data.dateOfBirth = this.user.birthDate;
          this.data.firstName = this.user.name.split(' ')[0];
          this.data.lastName = this.user.name.split(' ')[1];
          this.data.street = this.address.street;
          this.data.city = this.address.city;
          this.data.zip = this.address.zip;
          this.data.countryIso = this.getCountryById(this.address.countryId).iso;
          this.data.state = this.address.state;
          this.data.stateId = this.address.stateId;
          this.data.phone = this.address.phone;
        };

        this.getCountryById = function(countryId) {
          var country;
          if (!this.countries) {
            return null;
          }
          angular.forEach(this.countries, function(c) {
            if (c.id === countryId) {
              country = c;
              return null;
            }
          });
          return country;
        };

        this.onCountryChanged = function() {
          this.data.countryIso = this.data.country.iso;
        };

        this.getStates = function(selectedCountryIso) {
          angular.forEach(this.countries, function(country) {
            if (country.iso === selectedCountryIso) {
              this.states = country.states;
              return null;
            }
          }, this);
          return this.states;
        };

        this.create = function() {
          self.processing = true;

          hyperwallet
            .create(this.data)
            .then(function() {
              self.processing = false;
              if ($scope.onSuccess) {
                $scope.onSuccess();
              }
              self.creteErrorMessage = undefined;
            })
            .catch(function(resp) {
              if (resp.data.meta && resp.data.meta.error && resp.data.meta.error.message) {
                self.creteErrorMessage = resp.data.meta.error.message;
                $scope.$broadcast('hyperwallet.error', self.creteErrorMessage);
              }
              self.processing = false;
            });
        };
      }],
      controllerAs: 'HyperWalletCreator',
      templateUrl: 'views/hyperwallet/form.html',
      scope: {
        onSuccess: '&'
      },
      link: function($scope, $elm) {
        $scope.$on('hyperwallet.error', function() {
          angular.element('body').animate({scrollTop: $elm.offset().top}, 300);
        });
      }
    };
  }]);
