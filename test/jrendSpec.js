const { assert } = require('Chai');
const { it, describe } = require('mocha');
const Jrend = require('../src/jrend');

describe('Jrend - lightweight DOM rendering engine', () => {

    // allow document object
    require('jsdom-global')();

    it('should take a js Object and build a DOM element with it', () => {
        let obj = {
            tag: 'h1',
            innerValue: 'hello world'
        };

        let DOMobj = Jrend(obj);

        assert.equal(DOMobj.tagName, 'H1');
        assert.equal(DOMobj.innerHTML, 'hello world');
    });

    it('should build a dom element tree based on the constructor object', () => {
        let obj = {
            tag: 'div',
            value: {
                tag: 'h1',
                value: 'hello world'
            },
            innerValue: 'hello'
        };

        let DOMobj = Jrend(obj);
        let child = DOMobj.children;

        assert.equal( DOMobj.tagName, 'DIV' );
        assert.equal( DOMobj.innerHTML, 'hello<h1>hello world</h1>');

        assert.equal( child[0].tagName, 'H1' );
        assert.equal( child[0].innerHTML, 'hello world' );
    });

    it('should build a dom element tree using an array of children', () => {
        let obj = {
            tag: 'div',
            value: [
                {tag: 'h1', value: 'title'},
                {tag: 'h2', value: 'title2'},
                {tag: 'h3', value: 'title3'},
                {tag: 'h4', value: 'title4'},
            ]
        };

        let DOMobj = Jrend(obj);
        let children = DOMobj.childNodes;

        assert.equal( DOMobj.tagName, 'DIV' );

        assert.equal( children[0].tagName, 'H1' );
        assert.equal( children[0].innerHTML, 'title' );

        assert.equal( children[1].tagName, 'H2' );
        assert.equal( children[1].innerHTML, 'title2' );

        assert.equal( children[2].tagName, 'H3' );
        assert.equal( children[2].innerHTML, 'title3' );

        assert.equal( children[3].tagName, 'H4' );
        assert.equal( children[3].innerHTML, 'title4' );
    });

    it('should assign arguments to elements using all 3 styles of input', () => {
        let obj = {
            tag: 'div',
            args: 'id=div1ID',
            value: [
                {tag: 'div', args: ['id=div2ID', 'class=div2class', 'readonly', 'customArg=true']},
                {tag: 'div', args: {
                    id: 'div3ID',
                    class: 'div3class',
                    readonly: undefined,
                    customArg: true
                }}
            ]
        };

        let DOMobj = Jrend(obj);
        let children = DOMobj.childNodes;

        assert.equal( DOMobj.tagName, 'DIV');
        assert.equal( DOMobj.id, 'div1ID');

        assert.equal( children[0].tagName, 'DIV');
        assert.equal( children[0].id, 'div2ID');
        assert.equal( children[0].className, 'div2class');
        assert.equal( children[0].attributes[2].localName, 'readonly');
        assert.equal( children[0].attributes[2].value, '');
        assert.equal( children[0].attributes[3].localName, 'customarg');
        assert.equal( children[0].attributes[3].value, 'true');

        assert.equal( children[1].tagName, 'DIV');
        assert.equal( children[1].id, 'div3ID');
        assert.equal( children[1].className, 'div3class');
        assert.equal( children[1].attributes[2].localName, 'readonly');
        assert.equal( children[1].attributes[2].value, '');
        assert.equal( children[1].attributes[3].localName, 'customarg');
        assert.equal( children[1].attributes[3].value, 'true');
    });
});