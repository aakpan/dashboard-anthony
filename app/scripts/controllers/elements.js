'use strict';

/**
 * @ngdoc function
 * @name dashboard20App.controller:ElementsCtrl
 * @description
 * # ElementsCtrl
 * Controller of the dashboard20App
 */
angular.module('dashboard20App')
  .controller('ElementsCtrl', function (elements,utils) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
	console.log(elements);
	
	//console.log(utils);
  });
