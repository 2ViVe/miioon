describe('Gift Code', function() {

  var $scope,
      giftCodeCtrl,
      deferred,
      promise,
      giftCard,
      rootScope,
      when = describe;

  beforeEach(module('2ViVe'));

  beforeEach(inject(function($rootScope, $controller, GiftCard, $q) {

    deferred = $q.defer();
    promise = deferred.promise;
    $scope = $rootScope.$new();
    giftCard = GiftCard;
    rootScope = $rootScope;
    spyOn(GiftCard, 'fetch').andReturn(promise);

    giftCodeCtrl = $controller('giftCodeCtrl', {
      $scope: $scope,
      GiftCard: GiftCard
    });

  }));

  when('controller initialized', function() {
    it('should start fetching the giftcard items', function() {
      expect(giftCard.fetch).toHaveBeenCalled();
    });

    it('should assign scope with the result of giftcard service', function() {
      var result = [];
      deferred.resolve(result);
      rootScope.$apply();

      expect($scope.giftcodes).toBe(result);
    });
  });

});
