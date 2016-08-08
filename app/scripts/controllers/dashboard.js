'use strict';

/**
 * @ngdoc function
 * @name dashboard20App.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the dashboard20App
 */
angular.module('dashboard20App')
  .controller('DashboardCtrl', function ($scope , dashboardService) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    
	$scope.dashboardService = dashboardService;
	
	$scope.dashboardService.init($scope);
	
	console.log(dashboardService);
	
});
