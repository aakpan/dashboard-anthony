'use strict';

describe('Service: generatePDF', function () {

  // load the service's module
  beforeEach(module('dashboard20App'));

  // instantiate service
  var generatePDF;
  beforeEach(inject(function (_generatePDF_) {
    generatePDF = _generatePDF_;
  }));

  it('should do something', function () {
    expect(!!generatePDF).toBe(true);
  });

});
