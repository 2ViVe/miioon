describe('Signup Directives', function () {

  var when = describe,
      $compile,
      $scope;


  beforeEach(module('2ViVe'));

  beforeEach(inject(function($rootScope, _$compile_) {
    $compile = _$compile_;
    $scope = $rootScope;
  }));


  describe('signUpStep1', function() {

    var comipleSignup = function(markup, scope) {
      var el = $compile(markup)(scope);
      scope.$digest();
      return el;
    };

    it ('should not have attr disabled when scroll down to the bottom', function() {

      var el = comipleSignup(
        '<div class="sign-up-step1">' +
          '<textarea id="term-condition" readonly cols="30" rows="14">'+
          'Miioon Application & Agreement' +
          'The Application & Agreement, Policies & Procedures and Compensation Plan are specifically incorporated herein by reference.' +
          'Independent Sales Representative Agrees to the Following:' +
          '1) Independent Sales Representative is of legal age in the state/province or country in which he/she resides.' +
          '2) Any Independent Sales Representative who sponsors another Independent Sales Representative or receives a Bonus or Commission on the product sales of another Independent Sales Representative must fulfill the obligation of performing a bona fide supervisory, distributing and selling function in the sale or delivery of a product or service to the ultimate consumer and in the training of those personally sponsored. Independent Sales Representative must have ongoing contact, communication and arrangement with his' +
          '1) Independent Sales Representative is of legal age in the state/province or country in which he/she resides.' +
          '2) Any Independent Sales Representative who sponsors another Independent Sales Representative or receives a Bonus or Commission on the product sales of another Independent Sales Representative must fulfill the obligation of performing a bona fide supervisory, distributing and selling function in the sale or delivery of a product or service to the ultimate consumer and in the training of those personally sponsored. Independent Sales Representative must have ongoing contact, communication and arrangement with his' +
          '</textarea>' +
          '<button id="is-agreed" disabled="disabled">agree</button>' +
        '</div>'
        , $scope);

      var $termsTextArea = el.find('#term-condition');

      $termsTextArea.get(0).scrollTop = 1000;
      $termsTextArea.trigger('scroll');

      expect(!!el.find('#is-agreed').attr('disabled')).toBeFalsy();
    })

  });


});