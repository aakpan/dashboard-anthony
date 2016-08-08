'use strict';

/**
 * @ngdoc overview
 * @name dashboard20App
 * @description
 * # dashboard20App
 *
 * Main module of the application.
 */
angular
  .module('dashboard20App', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'daterangepicker'
	])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl',
        controllerAs: 'reports'
      })
      .when('/elements', {
        templateUrl: 'views/elements.html',
        controller: 'ElementsCtrl',
        controllerAs: 'elements'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
