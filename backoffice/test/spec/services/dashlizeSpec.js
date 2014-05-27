'use strict';
/* jshint ignore:start */
describe('Dashlize', function() {

  var dashlize;

  beforeEach(module('2ViVe'));

  it('should dashlize the key of object', inject(function(Dashlize) {
    var obj = { thisIsTheName: 1 };

    expect(Dashlize(obj)['this-is-the-name']).toBe(obj.thisIsTheName);

  }));
});
/* jshint ignore:end */
