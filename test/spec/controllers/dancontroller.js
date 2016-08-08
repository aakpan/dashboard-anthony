'use strict';

describe('Controller: DancontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('serviceApp'));

  var DancontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DancontrollerCtrl = $controller('DancontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DancontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
