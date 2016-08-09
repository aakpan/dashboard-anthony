'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.buttons
 * @description
 * # buttons
 * Factory in the dashboard20App.
 */
angular.module('dashboard20App')
  .factory('buttons', function(){
    
    return {
        
        /********************************
         *  BUTTONS FOR COMPONENT_VIEWS
         */

        // VIEW RECORD BUTTON 
        viewButton: function(){
            var btn = '<button type="button" class="btn btn-sm"';
            btn += ' data-id="view"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-eye"></i></button>';
            return btn;
        },

        // EDIT RECORD BUTTON
        editButton: function(){
            var btn = '<button type="button" class="btn btn-sm"';
            btn += ' data-id="edit"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-pencil"></i></button>';
            return btn;
        },

        // DELETE RECORD BUTTON
        deleteButton: function(){
            var btn = '<button type="button" class="btn btn-sm"';
            btn += ' data-id="delete"';
            btn += ' data-ng-click="button($index, $event)"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-trash-o"></i></button>';
            return btn;
        },
        
        /********************************
         *  BUTTONS FOR SEARCH PANEL
         */
        
        // SEARCH BUTTON
        filterSearch: function(){
            var btn = '<button type="button" class="btn btn-primary btn-sm"';
            btn += ' data-ng-click="searchfilter()"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="search-button fa fa-search"></i> Search</button>';
            return btn;
        },
        
        filterReset: function(){
            var btn = '<button type="button" class="btn btn-primary btn-sm"';
            btn += ' data-ng-click="resetfilter()"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="search-button fa fa-refresh"></i> Reset</button>';
            return btn;
        }, 
        
        filterClear: function(){
            var btn = '<button type="button" class="btn btn-primary btn-sm"';
            btn += ' data-ng-click="clearfilter()"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="search-button fa fa-minus-square-o"></i> Clear</button>';
            return btn;
        },
        
        filterClose: function(){
            var btn = '<button type="button" class="search-button btn btn-primary btn-sm"';
            btn += ' data-ng-click="sidebar()"';
            btn += ' data-ng-disabled="disableButton">';
            btn += '<i class="fa fa-times"></i> Close</button>';
            return btn;
        },
        
        modalClose: function(){
            var btn = '<button class="btn btn-sm btn-default" data-dismiss="modal" data-ng-click="closeModal();">';
            btn+= '<i class="fa fa-times"></i> cancel</button>';
            return btn;
        },
        
        modalSubmit: function(a){
            var btn = '<button class="btn btn-sm btn-primary"';
            btn += ' data-ng-click="modalSubmit($index, $event);">';
            btn += '<i class="fa fa-download"></i> Export ' + a + '</button>';
            return btn;
        }
        
    };

});

