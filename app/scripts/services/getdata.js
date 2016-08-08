'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.getData
 * @description
 * # getData
 * Service in the dashboard20App.
 */
angular.module('dashboard20App')
  .service('getData', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	return {
		get		:	function(){
			return $http.get();
		}
	}
 });
