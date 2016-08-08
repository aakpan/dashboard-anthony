'use strict';

describe('Service: dashboard20App', function () {

  // load the service's module
  beforeEach(module('serviceApp'));

  // instantiate service
  var dashboard20App;
  beforeEach(inject(function (_dashboard20App_) {
    dashboard20App = _dashboard20App_;
  }));

  it('should do something', function () {
    expect(!!dashboard20App).toBe(true);
  });

});
