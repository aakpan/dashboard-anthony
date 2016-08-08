'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.generatePDF
 * @description
 * # generatePDF
 * Service in the dashboard20App.
 */
angular.module('dashboard20App')
	.service('generatePdf', function ($scope,$compile,getData) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	return {
			init		:	function(){
							console.log('we good to go!!!',getData);
							/* Make new REST Call Here and replace this.data */
							
							/* Set Order Ref # in the textbox */
							angular.element('#orderRef').val(this.data.order.ref);
							
							var customer_type = ['Hospitality','Agency','L.R.S','Grocery','MFR Store'];
							
							var order_totals = {
								sub_total			:	0,
								tax					: 	this.data.order.tax,
								container_deposit	:	0
							};
							
							var customer_type_list = '';
							
							var self = this;
							
							angular.forEach(customer_type,function(type,key){
								customer_type_list += '<li class="list-group-item">'+
														((self.data.customer.customer_type.toLowerCase() === type.toLowerCase()) ? '<span class="badge">X</span>' : '')+
														type+
													  '</li>';
							});
							
							var doc_info = '<div class="row doc_info">'+
												'<div class="col-xs-4">'+
													'<ul class="list-group">'+customer_type_list+'</ul>'+
												'</div>'+
												'<div class="col-xs-4 text-center">'+
													'<h2>liqour distribution branch</h2>'+
													'<h2><strong>licensee - agency order form</strong></h2>'+
												'</div>'+
												'<div class="col-xs-4 text-center">'+
													'<h2><strong>'+this.data.order.doc_type+' # '+this.data.order.ref+'</strong></h2>'+
													'<h2 class="gray"><strong>Confidential</strong></h2>'+
													'<div>'+
														'<dl class="dl-horizontal">'+
														  '<dt>STORE</dt>'+
														  '<dd>'+this.data.customer._id+'</dd>'+
														  '<dt>DATE</dt>'+
														  '<dd>'+moment(this.data.order.date).format('MMM Do YYYY')+'</dd>'+
														'</dl>'+
													'</div>'+
												'</div>'+
											'</div>';
											
							var doc_manf_info = '<div class="row manf_info">'+
													'<div class="col-xs-4 text-center">'+
														'<input type="text" class="form-control" value="'+this.data.customer._id+'" name="customer_id"/>'+
														'<label for="customer_id" class="control-label">Customer Number</label>'+
													'</div>'+
													'<div class="col-xs-4 text-center">'+
														'<address>'+
														  '<strong>'+this.data.manufacturer.manufacturer_name+'</strong><br>'+
														  this.data.manufacturer.manufacturer_address+'<br>'+
														  this.data.manufacturer.manufacturer_city+', '+this.data.manufacturer.manufacturer_province+' '+this.data.manufacturer.manufacturer_zipcode+'<br>'+
														  this.data.manufacturer.manufacturer_country+
														'</address>'+
													'</div>'+
													'<div class="col-xs-4">'+
														'<label for="order_comments" class="control-label">Order Comments</label>'+
														'<textarea class="form-control" name="order_comments" value="'+this.data.order.comments+'" rows="3"></textarea>'+
													'</div>'+
												'</div>';
							
							var doc_cust_info	=	'<div class="row cust_info">'+
														'<div class="col-xs-4 col-xs-offset-4">'+
															'<address>'+
																'<strong>'+this.data.customer.customer_name+'</strong><br>'+
																this.data.customer.customer_address+'<br>'+
																this.data.customer.customer_city+', '+this.data.customer.customer_province+' '+this.data.customer.customer_zipcode+'<br>'+
																this.data.customer.customer_country+
															'</address>'+
															'<small>address of licensee premisis or agency</small>'+
														'</div>'+
													'</div>';
													
							var doc_order_table_ordered = '';
							
							angular.forEach(this.data.order.ordered,function(order,key){
								doc_order_table_ordered	+=  '<td>'+order.size+' '+self.data.user_data.units+'</td>'+
															'<td>'+order.quantity+'</td>'+
															'<td>'+order.brand_name+'</td>'+
															'<td>'+order.size+' '+self.data.user_data.units+'</td>'
							});
							
							var doc_order_table_supplied = '';
							
							angular.forEach(this.data.order.supplied,function(supply,key){
								doc_order_table_supplied += '<tr><td>'+supply.stock_number+'</td>'+
															'<td>'+supply.quantity+'</td>'+
															'<td>'+self.data.user_data.symbol+' '+supply.selling_price+'</td>'+
															'<td>'+self.data.user_data.symbol+' '+(parseFloat(supply.quantity*supply.selling_price).toFixed(2))+'</td></tr>'
															
								order_totals.sub_total += supply.quantity*supply.selling_price;
							});
							
							var doc_order_table_keg_ordered = '';
							
							angular.forEach(this.data.order.container,function(container,key){
								doc_order_table_keg_ordered += 	'<tr><td>'+container.size+' '+this.data.user_data.units+'</td>'+
																'<td>'+container.quantity+'</td>'+
																'<td>'+(parseFloat(container.unit_deposit).toFixed(2))+'</td>'+
																'<td>'+self.data.user_data.symbol+' '+(parseFloat(container.quantity*container.unit_deposit).toFixed(2))+'</td><tr>'
								
								
								order_totals.container_deposit += container.quantity*container.unit_deposit;
							});

							var doc_signatures = 	'<div class="row signatures">'+
														'<div class="col-xs-8">'+
															'<div class="row">'+
																'<div class="col-xs-6">'+
																	'<input type="text" class="form-control" name="prepared_by" value="'+this.data.user_data.username+'"/>'+
																	'<label for="prepared_by" class="control-label">Prepared By</label>'+
																'</div>'+
																'<div class="col-xs-6">'+
																	'<input type="text" class="form-control" name="licensee" />'+
																	'<label for="licensee" class="control-label">Signature of Authorized Officer of Licensee or Agent</label>'+
																'</div>'+
															'</div>'+
															'<div class="row">'+
																'<div class="col-xs-6">'+
																	'<input type="text" class="form-control" name="checked_by" />'+
																	'<label for="checked_by" class="control-label">Checked By</label>'+
																'</div>'+
																'<div class="col-xs-6">'+
																	'<input type="text" class="form-control" name="driver_signature" />'+
																	'<label for="driver_signature" class="control-label">Signature of Driver</label>'+
																'</div>'+
															'</div>'+
														'</div>'+
													'</div>';
													
							
							var doc_order_table_footer	=	'<div class="row">'+
																'<div class="col-xs-5">'+
																	'<table class="table table-bordered ordered">'+
																		'<tr>'+
																			'<th>Size</th>'+
																			'<th>Quantity</th>'+
																			'<th>Unit Deposit</th>'+
																			'<th>Total Deposit</th>'+
																		'</tr>'+doc_order_table_keg_ordered+
																	'</table>'+
																'</div>'+
																'<div class="col-xs-5 col-xs-offset-2">'+
																	'<dl class="dl-horizontal">'+
																		'<dt>Product Sub Total</dt>'+
																		'<dd>'+(parseFloat(order_totals.sub_total).toFixed(2))+'</dd>'+
																		'<dt>Tax Total</dt>'+
																		'<dd>'+order_totals.tax+'</dd>'+
																		'<dt>Container Deposit</dt>'+
																		'<dd>'+(parseFloat(order_totals.container_deposit).toFixed(2))+'</dd>'+
																		'<dt>Amout Due</dt>'+
																		'<dd>'+(parseFloat(order_totals.sub_total+order_totals.tax+order_totals.container_deposit).toFixed(2))+'</dd>'+
																	'</dl>'+
																'</div>'+
															'</div>'+doc_signatures;
							
							var doc_order_table	=	'<div class="row text-center" style="margin-top:30px;">'+
														'<div class="col-md-12">'+
															'<table class="table table-bordered ordered" style="width:50%">'+
																'<tr>'+
																	'<th colspan="4">Ordered</th>'+
																'</tr>'+
																'<tr>'+
																	'<th>Size</th>'+
																	'<th>Quantity</th>'+
																	'<th>Brand Name</th>'+
																	'<th>Size</th>'+
																'</tr>'+
																'<tr>'+doc_order_table_ordered+'</tr>'+
															'</table>'+
															'<table class="table table-bordered supplied" style="width:50%">'+
																'<tr>'+
																	'<th colspan="4">Supplied</th>'+
																'</tr>'+
																'<tr>'+
																	'<th>Stock Number</th>'+
																	'<th>Quantity in Units</th>'+
																	'<th>Unit Selling Price</th>'+
																	'<th>Value</th>'+
																'</tr>'+doc_order_table_supplied+
															'</table>'+
														'</div>'+
													'</div>'+doc_order_table_footer;
													
							
							var doc_str = 	doc_info+doc_manf_info+doc_cust_info+doc_order_table;
										
							angular.element('#result').html($compile(doc_str)($scope));	
						},
			document	:	new jsPDF(),
			generate	:	function(){
			
				var result = angular.element('#result');
				
				$scope.doc.addHTML(result.get(0),function(){
					this.document.save(this.data.order.doc_type+'-'+this.data.order.ref+'.pdf');
				});
				
				var specialElementHandlers = {
					'#editor': function(element, renderer){
						return true;
					}
				};
				
				console.log(result.get(0));
				/*
				this.document.fromHTML(result.get(0),15,15,{
					'width'				: 170, 
					'elementHandlers': specialElementHandlers
				});
				*/
				//
				this.document.width(cache_width);
			},
			data		:	{
				"user_data": {
				  "_id": "5774c2d0c8176b618b8a308c",
				  "username": "Elepant Wines Admin",
				  "currency": "USD",
				  "symbol": "$",
				  "units": "ml"
				},
				"customer": {
				  "_id": 505,
				  "customer_type": "mfr store",
				  "customer_name": "Brewey Creek Beer And Wine Store",
				  "customer_address": "3045 Main St",
				  "customer_city": "Vancouver",
				  "customer_province": "BC",
				  "customer_zipcode": "",
				  "customer_country": "Canada",
				  "customer_phone": 6048723373
				},
				"manufacturer": {
				  "_id": "5774c2d0100a4637fac3f41b",
				  "manufacturer_name": "Elephant Island Wines (Naramata Cider Co)",
				  "manufacturer_address": "2730 Aikins Loop RR#1 S5 C18",
				  "manufacturer_city": "Naramata",
				  "manufacturer_province": "BC",
				  "manufacturer_zipcode": "v0h 1n0",
				  "manufacturer_country": "Canada",
				  "manufacturer_phone": ""
				},
				"order": {
				  "ref": "NC000162",
				  "doc_type": "doc60",
				  "date": "2015-10-02T12:30:35 +07:00",
				  "tax"	: 8.74,
				  "ordered": [
					{
					  "size": 355,
					  "quantity": 3,
					  "brand_name": "Naramata Cider Co - Apple Cider (4pk)"
					}
				  ],
				  "supplied": [
					{
					  "stock_number": 610642,
					  "quantity": 18,
					  "selling_price": 9.71
					}
				  ],
				  "container"	:	[
					{
						"size"			:	355,
						"quantity"		:	72,
						"unit_deposit"	:	0.10,
					}
				  ],
				  "comments": ""
				  
				}
			}
	};
  });
