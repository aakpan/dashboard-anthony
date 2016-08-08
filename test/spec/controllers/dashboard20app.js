'use strict';

describe('Controller: Dashboard20appCtrl', function () {

  // load the controller's module
  beforeEach(module('serviceApp'));

  var Dashboard20appCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Dashboard20appCtrl = $controller('Dashboard20appCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Dashboard20appCtrl.awesomeThings.length).toBe(3);
  });
});
