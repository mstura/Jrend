/*
This is a side project in order to create a simple JS to DOM element
templating engine with the intention of easily building templates based on
object literals.

# todo: potentially implement an optional shadow DOM.
# todo: use keyed DOM elements linked to the shadow DOM.

This is a depency free library!

*/
(function() {
    
        'use strict';
    
        var space = /\s+/,
            definition = /=+/,
            separator = ' ';
    
        //utility functions
        /*function nthIndexOf(str, search, occurance){
            var L = str.length, i = -1;
            while (occurance-- && i++ < L) {
                i = str.indexOf(search, i);
                if (i < 0) break;
            }
            return i;
        }*/
    
        function assignValue(element, value){
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea' ) {
                element.value = (value ? value : '');
                return;
            }
    
            element.innerHTML = (value ? value : '');
        }
    
        //main HTML Element builder
        function Build(tag, value, args, context, innerValue) {
            var attributes = [],
                aValues = [];
            var element = (tag ? document.createElement(tag) : document.querySelector(context));
            
            if (!element) return false;
    
            if (innerValue && typeof innerValue === 'string') {
                assignValue(element, innerValue);
            }
    
            switch (typeof value) {
            case 'string':
                assignValue(element, value);
                break;
            case 'object':
                if (value instanceof HTMLElement) {
                    element.appendChild(value);
                    break;
                }
                if (value.length) {
                    var vall = value.length;
                    for (var i = 0; i < vall; i++) {
                        var e = value[i];
                        element.appendChild(
                            Build(e.tag,e.value,e.args, undefined, e.innerValue)
                        );
                    }
                    break;
                }
                element.appendChild(
                    Build(value.tag,value.value,value.args, undefined, value.innerValue)
                    );
                break;
            }
    
            if (args) {
                if (typeof args === 'string' || Array.isArray(args)) {
                    var l = ( Array.isArray(args) ? args.length : 1);
                    for (var x = 0; x < l; x++) {
                        var res = ( Array.isArray(args) ? args[x].split(definition) : args.split(definition));
                        var name = res[0];
                        var values = (res.length === 2 ? res[1].split(space) : res[0]);
                        attributes.push(name);
                        aValues.push(values);
                    }
                    var attl = attributes.length;
                    for (var y = 0; y < attl; y++) {
                        var n = attributes[y],
                            val = ( Array.isArray(aValues[y]) ? aValues[y].join(separator) : '');
                        element.setAttribute(n, val);
                    }
                } else if( typeof args === 'object'){
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            var v = ( args[key] ? args[key] : '');
                            
                            element.setAttribute(key, v);
                        }
                    }
                }
            }
            return element;
        }
    
        /**
         * Jrend
         * @param {Object} obj main Jrend template object
         * @param {string} obj.tag - HTML element name or tag
         * @param {any} obj.value - value to be passed to the element, it is possible to pass another jrend object as a parameter, or even an array of jrend objects
         * @param {HTMLElement | string} obj.context - set a parent element to which the template will be constructed upon ( no tag or args required if set )
         * @param {string | string[]} obj.args - attributes for the html element you wish to build using the following format ( "class=defaults" )
         * @param {string} obj.innerValue - a second value parameter to use in the case, value is already occupied by an object or array of objects
         */
        var Jrend = function (obj) {
            switch (typeof obj) {
            case 'object':
                return Build(obj.tag, obj.value, obj.args, obj.context, obj.innerValue);
            case 'string':
                return false;
            }
        };
    
        if ( typeof exports !== 'undefined' ) {
            module.exports = exports = Jrend;
        } else {
            window.Jrend = Jrend;
        }
    }());