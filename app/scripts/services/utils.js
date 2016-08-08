'use strict';

/**
 * @ngdoc service
 * @name dashboard20App.utils
 * @description
 * # utils
 * Factory in the dashboard20App.
 */
angular.module('dashboard20App')
  .factory('utils', function( growl ){
    return {
        /**
         * generic email regex pattern
         */
        validateEmail: function(str){
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(str);
        },
        /**
         * generic north america phone regex pattern
         */
        validateNAPhone: function(str){
            var phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phonePattern.test(str);
        },
        /**
         * generic united kingdom phone regex pattern
         */
        validateUKPhone: function(str){
            var phonePattern = /^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$/;
            return phonePattern.test(str);
        },
        /**
         * generic european phone regex pattern (france as default)
         */
        validateEUPhone: function(str){
            var phonePattern = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;
            return phonePattern.test(str);
        },
        /**
         * generic USA zipcode regex pattern
         */
        validateZipCode: function(str){
            var zipcodePattern = /(\d{5}([\-]\d{4})?)/;
            return zipcodePattern.test(str);
        },
        /**
         * generic Canadian postal code regex pattern
         */
        validateCDNPostalCode: function(str){
            var postalcodePattern = /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/;
            return postalcodePattern.test(str);
        },
        /**
         * generic united kingdom postal code regex pattern
         */
        validateUKPostalCode: function(str){
            var postalcodePattern = /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/;
            return postalcodePattern.test(str);
        },
        /**
         * password regex pattern for required:
         * 1: 8 characters minimum
         * 2: lowercase characters
         * 3: UPPERCASE characters
         * 4: Special Characters
         * 5: Numeric characters
         */
        validatePassword: function(str){
            var passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            return passwordPattern.test(str);
        },
        /**
         * not yet implemented 
         * I'll likely use this for warehouses, manufacturers 
         * or any other select list to avoid having to write
         * a lot of option:selected dummy jquery type javascript
         */
        optionSelected: function(el, idx){
            console.log(el, idx);
        },
        /**
         * test for string or number
         */
        isNumber: function(n) { 
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
        },
        /**
         * capitalise every word in a string
         */
        stringCapitalise: function( str ){
            var pieces = str.split(' ');
            for ( var i = 0; i < pieces.length; i++ ){
                var j = pieces[i].charAt(0).toUpperCase();
                pieces[i] = j + pieces[i].substr(1);
            }
            return pieces.join(' ');
        },
        /**
         * growl utility to call a single function
         * rather than having to pull the growl service 
         * for every event
         *
         * expand this for the login and for the socket notifications
         */
        growlMessage: function( type, msg, int ){
            switch(type){
                case 'warning': growl.warning(msg, {referenceId: int }); break;
                case 'error': growl.error(msg, {referenceId: int }); break;
                case 'success': growl.success(msg, { referenceId: int }); break;
                case 'info': growl.info(msg, { referenceId: int }); break;
            }
        },
        /**
         * Base64 Encode from UTF-8
         */
        stringEncode: function( str ){
            var encodedString = window.btoa(encodeURI(str));
            return encodedString;
        },
        /**
         * UTF-8 Decode from Base64
         */
        stringDecode: function( str ){
            var decodedString = decodeURI(window.atob(str)); 
            return decodedString;
        },
        /**
         * REPLACE JAVASCRIPT typeOf
         * toType({a: 4}); //"object"
         * toType([1, 2, 3]); //"array"
         * (function() {console.log(toType(arguments))})(); //arguments
         * toType(new ReferenceError); //"error"
         * toType(new Date); //"date"
         * toType(/a-z/); //"regexp"
         * toType(Math); //"math"
         * toType(JSON); //"json"
         * toType(new Number(4)); //"number"
         * toType(new String("abc")); //"string"
         * toType(new Boolean(true)); //"boolean"
         */
        toType: function(obj) {
          return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        /**
         * Round up a number
         * determine number of decimal places
         */
        roundUp: function(num, dec){
            dec = dec || 0;
            num = num || 0;
            var result = Math.round( String(num) * 100 )/100;
            return Number( (result).toFixed(dec) );
        }
    };
});

