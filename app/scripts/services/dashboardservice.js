'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.dashboardService
 * @description
 * # dashboardService
 * Service in the dashboard20App.
 */
angular.module('dashboard20App')
  .service('dashboardService', function ( $compile , $q ) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	//var moment = require('moment');
	
	//var Chartist = require('chartist');
	
	var data = 	{
					  location: 1,
					  manufacturers: 24,
					  range: {
						min: "2016-05-01 00:00:00",
						max: "2016-05-31 23:59:59",
						details: "This is initiated onload for this module. The storedProc will pull today\'s date and render everything from Monday this week, until Friday of this week for the rest of the data.  For your purposes I\'ve given an entire month date range."
					  },
					  items: {
						orders: {
						  initiated: {
							quantity: 34,
							filter: {
							  
							},
							details: "quanity is the returned sum. filter is the click through quick jump for the user on the function call from the click on the ring of the donut on which this data is rendered."
						  },
						  pending: {
							quantity: 11,
							filter: {
							  
							}
						  },
						  delivered: {
							quantity: 22,
							filter: {
							  
							}
						  },
						  voided: {
							quantity: 4,
							filter: {
							  
							}
						  }
						},
						transfers: {
						  initiated: {
							quantity: 34,
							filter: {
							  
							}
						  },
						  pending: {
							quantity: 11,
							filter: {
							  
							}
						  },
						  delivered: {
							quantity: 22,
							filter: {
							  
							}
						  },
						  voided: {
							quantity: 4,
							filter: {
							  
							}
						  }
						},
						adjustments: {
						  returns: {
							quantity: 25,
							filter: {
							  
							}
						  },
						  damaged: {
							quantity: 11,
							filter: {
							  
							}
						  },
						  other: {
							quantity: 8,
							filter: {
							  
							}
						  }
						}
					  }
				}; //result of dashboard assets go here
	return{
		getData : function(){
			
		},
		getDateFilter	:	function(start_date , end_date , $scope){
			/* Initialize Datepicker */
			
			var now = new Moment();
			
			$scope.datePicker = {
				date 	: {startDate: moment(start_date), endDate: moment(end_date)},
				options : {
						ranges : {
							/* More Date ranges can be added here */ 
							'Today'			:	[now],
							'Last Week' 	: 	[now.subtract(6,'days'), now],
							'Last Month'	:	[now.subtract(30,'days'), now]	
						}
					}
			};
			
			var donut_filters_html = 	'<div class="col-md-12">'+
											'<div class="input-group">'+
												'<span class="input-group-addon" id="basic-addon3">Date Range</span>'+
												'<input date-range-picker class="form-control date-picker" type="text" ng-model="datePicker.date" options="datePicker.options" />'+
												'<div class="input-group-btn">'+
													'<button type="button" class="btn btn-default" aria-label="Reload Widgets" title="Reload Widgets" ng-click="reloadWidgets()"><span class="glyphicon glyphicon-refresh"></span></button>'+
												'</div>'+
											'</div>'+
										'</div>';
									
			angular.element('.filters').append($compile(donut_filters_html)($scope));
		
		},
		loadWidgets		:	function(data_obj , $scope){	
			 /* Refactor reload widgets into this function to take dates as a variable and make rest call */
			console.log('Widgets Initialized');
			/* Initialize Donut Widget */
			$scope.donut = {
				charts		:	{},
				options		:	{
					donut		:	true,
					donutWidth	: 	12,
					labelInterpolationFnc: function(value) {
						return value[0];
					}
				},
				responsiveOptions : [
					['screen and (min-width: 640px)', {
						chartPadding: 10,
						labelOffset: 50,
						labelDirection: 'explode',
						labelInterpolationFnc: function(value) {
							return value;
						}
					}],
					['screen and (min-width: 1024px)', {
						labelOffset: 40,
						chartPadding: 10
					}]
				]
			};
			
			
			
			angular.forEach( data_obj , function(parent_value,parent_key){
			
				$scope.donut.charts[parent_key] = {
					widgetTitle : 	parent_key,
					labels		: 	[],
					series		:	[],
					total		:	0,
					sliceColor	:	['#d70206','#f05b4f','#f4c63d','#d17905','#453d3f','#59922b','#0544d3'],
					data		:	[]
				};
								
				var donut_html  = 	'<div class="col-sm-4" id="'+ parent_key +'">'+
										'<div class="panel panel-default">'+
											'<div class="panel-heading">'+
												'<h3 class="panel-title">'+ angular.uppercase(parent_key) +'</h3>'+
											'</div>'+
											'<div class="panel-body">'+
												'<div class="ct-chart '+ parent_key +'"></div>'+
											'</div>'+
											'<div class="list-group"></div>'+
										'</div>'+
									'</div>';
				
				angular.element('.widgets').append($compile(donut_html)($scope));	
							
				/* Initialize the Chart */
				var donut = new Chartist.Pie('.ct-chart.'+parent_key, 
				{
				  labels: $scope.donut.charts[parent_key].labels,
				  series: $scope.donut.charts[parent_key].series
				},$scope.donut.options,$scope.donut.responsiveOptions);	
				
				
				
				donut.on('draw', function(data) {
					
					if(data.type === 'slice') {
						
						var elem = data.element.attr({
							//style: 'stroke: '+$scope.donut.charts[parent_key].sliceColor[i]+';stroke-width:12px',
						});
						
						console.log(elem._node);
						
						/* Url redirect from clicking each slice */
						angular.element(elem._node).on('click',function(){
							window.location.replace("#/");
						});
						
						angular.element(elem._node).on('hover',function(){
							console.log('hovered',this);
						});
					}
					
				});
					
				var i = 0;				
							
				angular.forEach( data_obj[parent_key] , function(child_value,child_key){
					
					console.log('Current Slice',$scope.donut.charts[parent_key].sliceColor[i]);
					
					/* Build Arrays for Chart */
					$scope.donut.charts[parent_key].labels.push(child_key);
					$scope.donut.charts[parent_key].series.push(child_value.quantity);
					
					
					
					/* Build Object for Widget Details */
					
					var obj = {
						activity_name 	:	child_key,
						quantity		:	child_value.quantity,
						details			:	child_value.details,
						filter			:	child_value.filter
					};
					
					$scope.donut.charts[parent_key].data.push(obj);
					
					var str = 	'<a href="#/" class="list-group-item">'+
									'<span class="badge" style="background-color:'+ $scope.donut.charts[parent_key].sliceColor[i] +'">'+ child_value.quantity +'</span>'+ child_key +
								'</a>';		
												
					angular.element('#'+parent_key+' .list-group').append($compile(str)($scope));
					
					i++;
					
					/* Add to total */ 
					$scope.donut.charts[parent_key].total += child_value.quantity;
				});
							
				angular.element('#'+parent_key+' .panel-body').append($compile('<h1 class="total">'+ $scope.donut.charts[parent_key].total +'</h1>')($scope));	
			});

		},
		reloadWidgets	:	function(newDate){
			console.log('Reload Called');
			
			$scope.count++;
			
			/* Clear total */
			//angular.element('#'+parent_key+' .total').empty();

			/* data.items = $scope.getData(); */
			angular.forEach( data.items ,function(parent_val,parent_key){
				/* Reload $scope.donut with new data */
				$scope.donut.charts[parent_key] = {
					widgetTitle 		: 	parent_key,
					labels				: 	[],
					series				:	[],
					total				:	0,
					sliceColor			:	['#d70206','#f05b4f','#f4c63d','#d17905','#453d3f','#59922b','#0544d3'],
					data				:	[]
				};			
				
				console.log('.ct-chart.'+parent_key);
				
				angular.element('#'+parent_key+' .list-group').empty();
				
				var i = 0;	
				
				angular.forEach( data.items[parent_key] , function(child_value,child_key){
					
					/* Build Arrays for Chart */
					$scope.donut.charts[parent_key].labels.push(child_key);
					$scope.donut.charts[parent_key].series.push(child_value.quantity);
					
					/* Build Object for Widget Details */
					
					var obj = {
						activity_name 	:	child_key,
						quantity		:	child_value.quantity,
						details			:	child_value.details,
						filter			:	child_value.filter
					};
					
					$scope.donut.charts[parent_key].data.push(obj);
									
					var str = 	'<a href="#/" class="list-group-item">'+
									'<span class="badge" style="background-color:'+ $scope.donut.charts[parent_key].sliceColor[i] +'">'+ child_value.quantity +'</span>'+ child_key +
								'</a>';		
					
					angular.element('#'+parent_key+' .list-group').append($compile(str)($scope));
					
					i++;
					
					/* Add value to total */
					$scope.donut.charts[parent_key].total += child_value.quantity;
					
				});
				
				angular.element('#'+parent_key+' .panel-body').append($compile('<h1 class="total">'+ $scope.donut.charts[parent_key].total +'</h1>')($scope));	
				
				var chart = Chartist.Pie('.ct-chart.'+parent_key,{
					  labels: $scope.donut.charts[parent_key].labels,
					  series: $scope.donut.charts[parent_key].series
					},
					$scope.donut.options,
					$scope.donut.responsiveOptions).update().on('draw', function(data) {
						/* Some Kool Animation Str8 from the examples in chartist to show there has been a reload */
						if(data.type === 'slice') {
							// Get the total path length in order to use for dash array animation
							var pathLength = data.element._node.getTotalLength();

							// Set a dasharray that matches the path length as prerequisite to animate dashoffset
							data.element.attr({
							  'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
							});

							// Create animation definition while also assigning an ID to the animation for later sync usage
							var animationDefinition = {
								'stroke-dashoffset': {
									id: 'anim' + data.index,
									dur: 500,
									from: -pathLength + 'px',
									to:  '0px',
									easing: Chartist.Svg.Easing.easeOutQuint,
									// We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
									fill: 'freeze'
								}
							};

							// If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
							if(data.index !== 0) {
							  animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
							}

							// We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
							data.element.attr({
							  'stroke-dashoffset': -pathLength + 'px'
							});

							// We can't use guided mode as the animations need to rely on setting begin manually
							// See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
							data.element.animate(animationDefinition, false);
						}
					}).on('created', function() {
					  if(window.__anim21278907124) {
						clearTimeout(window.__anim21278907124);
						window.__anim21278907124 = null;
					  }
					  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
					}).on('draw', function(data) {
					
						if(data.type === 'slice') {
							
							
							var elem = data.element.attr({
								//style: 'stroke: '+$scope.donut.charts[parent_key].sliceColor[i]+';stroke-width:12px',
							});
													
							/* Url redirect from clicking each slice */
							angular.element(elem._node).on('click',function(){
								window.location.replace("#/");
							});
						}
					
				});

			});
			
		},
		init		:	function( $scope ){
			var self = this;
			
			$scope.$watch('datePicker.date',function(newDate){
				if($scope.count > 0){
					$scope.reloadWidgets(newDate);
				}
				$scope.count++;
			});	
			
			/* 	Initialize Dashboard | refactor intialization to load widgets based on dates , rest api loads today() on init and reload when passed date ranges	*/
			
			self.getDateFilter(data.range.min , data.range.max , $scope); /* Get the Filter */
			
			self.loadWidgets(data.items , $scope); /* Get Widgets replace data.items with response from rest call i.e getData() */
			
			self.count = 0;
		}
	};
  });
