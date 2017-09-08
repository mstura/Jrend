/* 
This is a side project in order to create a simple JS to DOM element
templating engine with the intention of easily building templates based on 
object literals.

# todo: allow HTML type inputs to be transformed into a DOM element structure from a base string.
# todo: potentially implement an optional shadow DOM.
# todo: use keyed DOM elements linked to the shadow DOM.

This is a depency free library!

*/

Object.defineProperty(exports, '__esModule', {
    value: true
});
module.exports = exports = (function() {

    'use strict';

    var space = /\s+/,
        definition = /=+/,
        separator = ' ';

    //utility functions
    function nthIndexOf(str, search, occurance){
        var L = str.length, i = -1;
        while (occurance-- && i++ < L) {
            i = str.indexOf(search, i);
            if (i < 0) break;
        }
        return i;
    }

    function assignValue(element, value){
        if (element.tagName.toLowerCase() === 'input') {
            element.value = (value ? value : '');
            return;
        }

        element.innerHTML = (value ? value : '');
    }

    //main HTML Element builder
    function Build(tag, value, args, context) {
        var attributes = [],
            aValues = [];
        var element = (tag ? document.createElement(tag) : document.getElementById(context));
        
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
                        Build(e.tag,e.value,e.args)
                    );
                }
                break;
            }
            element.appendChild(
                Build(value.tag,value.value,value.args)
                );
            break;
        }

        if (args) {
            var l = (typeof args == 'object' ? args.length : 1);
            for (var x = 0; x < l; x++) {
                var res = (typeof args == 'object' ? args[x].split(definition) : args.split(definition));
                var name = res[0];
                var values = (res.length === 2 ? res[1].split(space) : res[0]);
                attributes.push(name);
                aValues.push(values);
            }
            var attl = attributes.length;
            for (var y = 0; y < attl; y++) {
                var n = attributes[y],
                    val = (typeof aValues[y] === 'object' ? aValues[y].join(separator) : undefined);
                element.setAttribute(n, val);
            }
        }
        return element;
    }

    /*function Compile(string){
        var 
    }*/

    var jrend = function(obj) {
        switch (typeof obj) {
        case 'object':
            return Build(obj.tag, obj.value,obj.args, obj.context);
        case 'string':
            return ;//Compile(obj);
        }
    };
    
    return jrend;
}());

/*
(function (i){
    'use strict';

    console.log(i());
    
})(function (value){
    var space = /\s+/,
        def = /=+/;

    function nthIndexOf(str, search, occurance){
        var L = str.length, i = -1;
        while (occurance-- && i++ < L) {
            i = str.indexOf(search, i);
            if (i < 0) break;
        }
        return i;
    }

    function assignArgs(str){
        var args = [],
            arg, i = 0, s, n, L = str.length, LT = L;
        
        function f(str, index, end){
            return str.substring(index, end);
        }

        while(LT > 1){

        if (args.length === 0) {
            i = nthIndexOf(str, '"', 2)+1;
            arg = f(str, 0, i).trim();
            
        } else {
            s = str.substring(i+1 , L).trim();
            n = nthIndexOf(s, '"', 2)+1;
            arg = f(s, 0, n).trim();
            i = i + n;
            n = null;
            LT = L - i;
        }
        if (arg === '') break;;
        args.push(arg);
    }

        return args;
    }

    value = '<div class="hairy notShaved twitch" id="hair" "disabled">value</div>';
    //var s = value.substring(value.indexOf('>'),nthIndexOf(value, '<', 2));
    var element = value.substring(value.indexOf('<')+1, value.lastIndexOf('</div>'));
    var tag = element.substring(0,nthIndexOf(element, ' ', 1));
    var e = element.substring(tag.length, element.indexOf('>')).trim();
    var args = assignArgs(e);
    return {
        tag: tag,
        args: args,
        element: element
    };
});

/* HTML Example

<div class="app" id="app">
    <span class="test">value</span>
    <span class="test">value</span>
    <div>value</div>
</div>;

procedure:
- extract tag and arguments
- set tag and arguments in an object in the form of: 
{   tag: extracted Tag, 
    args: arrayOfArguments as strings
}

extract value up to lastIndexOf('</' + object.tag + '>')
or first index if the first closing tag matches unless 
a duplicate tag is opened

*/

