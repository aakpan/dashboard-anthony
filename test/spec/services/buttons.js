'use strict';

describe('Service: buttons', function () {

  // load the service's module
  beforeEach(module('dashboard20App'));

  // instantiate service
  var buttons;
  beforeEach(inject(function (_buttons_) {
    buttons = _buttons_;
  }));

  it('should do something', function () {
    expect(!!buttons).toBe(true);
  });

});