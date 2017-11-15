(function (i){
    'use strict';

    console.log(i());

})(function (value){
    var space = /\s+/,
        def = /=+/,
        quote = '"';

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

        function unquote(a){
          return a.replace(/["]/g, '');
        }

        while(LT > 1){

        if (args.length === 0) {
            i = nthIndexOf(str, quote, 2)+1;
            arg = f(str, 0, i).trim();

        } else {
            s = str.substring(i+1 , L).trim();
            n = nthIndexOf(s, quote, 2)+1;
            arg = f(s, 0, n).trim();
            i = i + n;
            n = null;
            LT = L - i;
        }
        if (arg === '') break;;
        arg = unquote(arg);
        args.push(arg);
    }

        return args;
    }

    value = '<div class="hairy notShaved twitch" id="hair" "disabled">'+
    '<span id="test"><span class="test">value</span></span>'+
  '</div>';

    var compile = function( val ){
        var tag = val.substring(val.indexOf('<')+1,nthIndexOf(val, ' ', 1));
        var element = val.substring(val.indexOf('<')+1, val.lastIndexOf('</'+ tag + '>'));
        var e = element.substring(tag.length, element.indexOf('>')).trim();
        var args = assignArgs(e);
        var v = val.substring(val.indexOf('>') +1, ( val.indexOf('</'+ tag +'>') === val.indexOf('>') +1 ? val.indexOf('</'+ tag +'>') : val.lastIndexOf('</' + tag + '>')));
        return {
            tag: tag,
            args: args,
            value: ( v[0] ==='<' ? compile( v ) : v )
        };
    };

    return compile( value );
    //var s = value.substring(value.indexOf('>'),nthIndexOf(value, '<', 2));
    
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
