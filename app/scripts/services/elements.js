'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.elements
 * @description
 * # elements
 * Factory in the dashboard20App.
 */
angular.module('dashboard20App')
  .factory('elements', function( $rootScope, $location, $window, $compile, $http, utils ){
    
    /**
     *  RE-FACTOR THIS USING THE DocumentFragment METHOD
     *  
     *  WE NEED TO BUILD ALL DIV'S SPAN'S ETC USING THIS
     *  METHOD SO WE CAN REMOVE MEMORY LEAKS AS WELL THE
     *  SPEED BENCHMARKS WILL BE DRAMATICALLY MORE EFFICIENT
     */
    
    return {
        
        insertHTML: function(str, $scope){ 
            angular.element('#insertModule').html($compile(str)($scope));
        },

        /**
         * PANEL LABEL
         */   
        panelLabel: function(row, key){
            var str = '<small><strong>';
            str += utils.stringCapitalise(key.replace(/_/g, ' ')); 
            str += ':</strong></small> ';
            return str;
        },
        
        /**
         * TABLE COLUMN
         */
        rowLabel: function(row, key){
            var str = '<small>' + utils.stringCapitalise(key.replace(/_/g, ' ')) + '</small>';
            return str;
        },
        
        /**
         * NESTED OBJECT
         */
        rowObject: function(row, key){
            var str = '';
            angular.forEach(row, function(item, label){
                str += '<div><small><strong>' + utils.stringCapitalise(label) + ':</strong> ';
                str += '<span data-ng-bind="item.'+key+'.'+label+'.value"/></small></div>';
            });
            return str;
        },

        /**
         * ELEMENT WITH INLINE EDITING
         */
        rowItem: function(row, key){
            var self = this, str = '';
            
            //console.log(key, row);

            if(row.input){
                if(row.permissions._patch === true){ 
                    str += '<span data-ng-click="edit($event,\''+key+'\')"';
                    str += ' class="element" style="font-size: 90%;"'; 
                }
                else{
                    str += '<span style="font-size: 90%;"';
                }
                // INPUT CHECKBOX (BOOLEAN)
                if(row.input === 'boolean'){
                    str += ' data-ng-bind="item.'+key+'.value"';
                    str += ' data-ng-model="item.'+key+'.value"/>'; 
                    if(row.permissions._patch === true){ str += this.checkbox(row, key); }
                }
                // SELECT OPTIONS
                if(row.input === 'select'){ 
                    str += ' data-ng-bind="item.'+key+'.selected.value"';
                    str += ' data-ng-model="item.'+key+'.selected.value"/>'; 
                    if(row.permissions._patch === true){ str += this.select(row, key); }
                }
                // INPUT TEXT
                if(row.input === 'text'){ 
                    str += ' data-ng-bind="item.'+key+'.value"';
                    str += ' data-ng-model="item.'+key+'.value"/>';
                    if(row.permissions._patch === true){ str += this.input(row, key); }
                }
                // INPUT NUMBER
                if(row.input === 'number'){ 
                    str += ' data-ng-bind="item.'+key+'.value"';
                    str += ' data-ng-model="item.'+key+'.value" stringToNumber />';
                    if(row.permissions._patch === true){ str += this.input(row, key); }
                }
            }
            else{
                str += self.rowObject(row, key);
            }

            return str;
        },

        /**
         * INLINE INPUT FIELD
         */
        input: function(row, key){
            var str = '<span class="field"';
            str += ' data-key="'+key+'"';
            str += ' style="display:none;">';
            str += '<input type="'+row.input+'"';
            str += ' data-ng-blur="hide($event,\''+key+'\')"';
            str += ' data-ng-model="item.'+key+'.value"';
            str += ' class="input form-control input-sm"/>';
            str += '</span>';
            return str;
        },

        /**
         * INLINE SELECT FIELD
         */
        select: function(row, key){
            var currentModule = angular.lowercase($rootScope.$$childTail.currentModule.name);
            var str = '<span class="field"';
            str += ' data-key="'+key+'"';
            str += ' style="display:none;">';
            str += '<select data-ng-model="item.'+key+'.selected" class="form-control input-sm"';
            str += ' data-ng-blur="hide($event,\''+key+'\')"';
            str += ' data-ng-options="item as item.value for item in $root.assets.';
            str += currentModule+'.'+key+' track by item.id"';
            str += ' data-ng-change="save($index,$event)"></select></span>';
            return str;
        },
        
        /**
         * INLINE CHECKBOX (checked = true)
         */
        checkbox: function(row, key){
            var str = '<span class="field" data-key="' + key +'"';
            str += ' style="display:none;">';
            str += '<input type="checkbox" data-ng-blur="hide($event, \'' + key + '\')"';
            str += ' data-ng-model="item.' + key + '.value"';
            ( row.value === true ) ? str += ' checked="checked"/>' : '/>';
            return str;
        },

        booleanFilter: function(row, key){
            var currentModule = $rootScope.$$childTail.currentModule,
                moduleName = angular.lowercase(currentModule.name);
            var str = '<select data-ng-model="item.'+key+'.value"';
            str += ' class="filter-column form-control input-sm"';
            str += ' name="' + key + '"';
            str += ' data-ng-options="item as item.value for item in $root.assets.';
            str += moduleName+'.'+key+' track by item.id"';
            ( currentModule.elements[key].display === false ) ?
                str += ' disabled="disabled"' : null;
            str += '></select>';
            return str;
        },
        
        inputFilter: function(row, key){
            
            var currentModule = $rootScope.$$childTail.currentModule;
            var str = '<input type="'+row.input+'"';
            str += ' name="' + key + '"';
            str += ' class="filter-column form-control input-sm"';
            ( currentModule.elements[key].display === false) ?
                str += ' disabled="disabled"' : null;
            str += '/>';
            return str;
        },
        
        selectFilter: function(row, key){
            var currentModule = $rootScope.$$childTail.currentModule,
                moduleName = angular.lowercase(currentModule.name);
            var str = '<select data-ng-model="item.'+key+'.selected"';
            str += ' class="filter-column form-control input-sm"';
            str += ' name="' + key + '"';
            str += ' data-ng-options="item as item.value for item in $root.assets.';
            str += moduleName+'.'+key+' track by item.id"';
            ( currentModule.elements[key].display === false ) ?
                str += ' disabled="disabled"' : null;
            str += '></select>';
            return str;
        },
        
        checkboxFilter: function(row, key){
            var str = '<input type="checkbox"';
            str += ' data-ng-bind="currentModule.elements.' + key + '.display"';
            str += ' data-ng-model="currentModule.elements.' + key + '.display"';
            str += ' data-ng-change="column(\''+key+'\')"';
            str += ' value="{{currentModule.elements.' + key + '.display}}"';
            str += '/>';
            return str;
        },
        
        inputEditor: function(moduleName, idx, row, key){
            var str = '<input type="'+row.input+'" name="'+key+'"';
            str += ' data-ng-model="'+moduleName+'['+idx+'].'+key+'.value"';
            str += ' class="input form-control input-sm" style="width: 150px;"/>';
            return str;
        },
        
        selectEditor: function(moduleName, idx, row, key){
            var str = '<select data-ng-model="'+moduleName+'['+idx+'].'+key+'.selected"';
            str += ' class="form-control input-sm" data-ng-options="';
            str += 'item as item.value for item in $root.assets.';
            str += moduleName+'.'+key+' track by item.id" style="width: 150px;"></select>';
            return str;
        },
        
        booleanEditor: function(moduleName, idx, row, key){
            var str = '<select data-ng-model="'+moduleName+'['+idx+'].'+key+'.value"';
            str += ' class="form-control input-sm" data-ng-options="';
            str += 'item as item.value for item in $root.assets.';
            str += moduleName+'.is_active track by item.id" style="width: 150px;"></select>';
            return str;
        },
        
        /**
         * IMPORT MODULE ROWS FORMFIELD ELEMENTS
         */
        importElement: function(item, label){
            console.log( item, label );
            var str = '<input type="text" name="' + label;
            str += '" class="form-control input-sm"';
            str += ' value="' + item + '"/>';
            return str;
        },
        
        /**
         * IMPORT RADIO OPTIONS
         */
        importSelector: function($scope){
            console.log($scope);
            // var thisModule = $scope.currentModule,
                // moduleName = thisModule.name.toLowerCase(),
                // moduleColumns = $scope[moduleName][0], 
            var str = '';
            str += '<select data-ng-model="moduleOptions" id="moduleSelector"';
            str += ' class="form-control input-sm" data-ng-options="';
            str += 'item as item.value for item in moduleOptions track by item.id" style="width: 150px;">';
            str += '<option value="" selected="selected"> -- Export Type -- </option></select>&nbsp;';
            return str;
        },
        importColumns: function($scope){
            var thisModule = $scope.currentModule,
                moduleName = thisModule.name.toLowerCase(), 
                moduleColumns = $scope[moduleName][0],
                str = '';
            angular.forEach(moduleColumns, function(item, key){
                if(key !== 'totalRecords' && key !== '$$hashKey'){
                    str += '<div class="col-sm-4 clearfix"><div class="input-group input-group-sm">';
                    str += '<span class="input-group-addon"><input type="checkbox" name="' + moduleName + '[]"';
                    str += ' value="' + key + '" class="form-control" checked="checked"/></span>';
                    str += '<span class="input-group-addon"><small>' + utils.stringCapitalise(key.replace(/_/g, ' '));
                    str += '</small></span>';
                    str += '</div></div>';
                }
            });
            return str;
        }
    };
    
});
