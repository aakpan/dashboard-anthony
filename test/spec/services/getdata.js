'use strict';

describe('Service: getData', function () {

  // load the service's module
  beforeEach(module('serviceApp'));

  // instantiate service
  var getData;
  beforeEach(inject(function (_getData_) {
    getData = _getData_;
  }));

  it('should do something', function () {
    expect(!!getData).toBe(true);
  });

});
