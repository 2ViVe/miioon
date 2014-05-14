'use strict';

describe('Gift Code', function() {

  var $scope,
      giftCodeCtrl,
      deferred,
      promise,
      giftCards,
      rootScope,
      when = describe;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($rootScope, $controller, GiftCards, $q) {

    deferred = $q.defer();
    promise = deferred.promise;
    $scope = $rootScope.$new();
    giftCards = GiftCards;
    rootScope = $rootScope;
    spyOn(GiftCards, 'fetch').andReturn(promise);

    giftCodeCtrl = $controller('giftCodeCtrl', {
      $scope: $scope,
      GiftCards: GiftCards
    });

  }));

  when('controller initialized', function() {
    it('should start fetching the giftcard items', function() {
      expect(giftCards.fetch).toHaveBeenCalled();
    });

    it('should assign scope with the result of giftcard service', function() {
      var result = [];
      deferred.resolve(result);
      rootScope.$apply();

      expect($scope.giftcodes).toBe(result);
    });
  });

});
