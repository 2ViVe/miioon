describe('Profile User Panel', function() {

  var when = describe,
      scope,
      deferred,
      UserStub,
      promise;

  beforeEach(module('2ViVe'));

  describe('Controller', function() {

    beforeEach(inject(function($controller, $rootScope, $q) {

      scope = $rootScope.$new();
      deferred = $q.defer();
      promise = deferred.promise;
      UserStub = { fetch: function() {} };

      spyOn(UserStub, 'fetch').andReturn(promise);

      $controller('profileInfoPanelCtrl', {
        $scope: scope,
        User: UserStub
      });

    }));




    when('user try to toggle the edit mode', function() {

      it('should change it to the other state', function() {
        var currentState = scope.isEditing;
        scope.toggle();

        expect(currentState).not.toBe(scope.isEditing);
      });

    });





  });

});
