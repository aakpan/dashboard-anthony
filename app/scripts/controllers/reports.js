'use strict';

/**
 * @ngdoc function
 * @name dashboard20App.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the dashboard20App
 */
angular.module('dashboard20App')
  .controller('ReportsCtrl', function ($scope , $compile , pdfService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	/* Bind the service to the scope */
	$scope.pdfService = pdfService;

	$scope.pdfService.init('#result' , $scope );
	
  });
