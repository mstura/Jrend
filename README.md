# Jrend
Jrend is a DOM lightweight rendering engine that was made to attempt to make it easier to render DOM elements. The main objective when creating this library was to provide an easy to use interface to create complex UI structures quickly without needing to learn an an extra templating language.

Jrend works in a simple fashion: Javascript objects are transformed into DOM elements as you desire them to be.

## Constructor Properties
Jrend takes a single object parameter with the following properties:
- tag : define the HTML tag name to be created
- args : properties, id, class or custom arguments that are to be assigned to the HTML element
- value : the value to be passed to the HTML element, think of this as you would the innerHTML property
- innerValue : this is an optional property that will rarely come into use as it forces a string value assignement to an HTML element
- context : this property takes an html selector to an existing dom element to which it will build the element structure, this should only ever be used on the top parent node, and if it is provided the 'tag' property should not be provided.

## Usage
Jrend is a constructor that takes a single object as it's parameter
```js
Jrend({
  tag: 'h1', 
  value: 'hello world' 
  });
  
// <h1>hello world</h1>
```
This would return the equivalent of the an h1 element with the innerHTML of "hello world";

Using the value property it is possible to create an entire html element tree to be returned instead of a single html element
```js
Jrend({
  tag: 'div',
  value: { 
    tag: 'div',
    value: {
      tag: 'span'
      value: 'Jrend created me and my parents'
      }
    }
  });

// <div>
//  <div>
//    <span>Jrend created me and my parents</span>
//  </div>
// </div>
```
The 'args' property has 3 different methods of usage depending on your needs and preference:
```js
Jrend({ 
  tag: 'span'
  args: 'id=mySpan'
  value: 'hello world'
  });
  
// <span id="mySpan">hello world</span>
```
Using a single string to define a property will be accepted as a suitable input, however using this method only 1 property can be assigned to the element.

```js
Jrend({
  tag: 'span',
  args: ['id=mySpan', 'class=mySpanClass', 'customarg=customvalue', 'readonly'],
  value: 'hello world'
  });
  
// <span id="mySpan" class="mySpanClass" customarg="customvalue" readonly>hello world</span>
```
Using an array of strings any property you like can be provided to the HTML element you are creating.

```js
Jrend({
  tag: 'span',
  args: {
    id: 'mySpan', 
    class: 'mySpanClass', 
    customarg: 'customvalue',
    readonly: undefined //because this is a particular example
    },
  value: 'hello world'
  });
  
// <span id="mySpan" class="mySpanClass" customarg="customvalue" readonly >hello world</span>
```
as in the previous example the result is identical, however args are provided in the form of an object, where the object key will define the HTML elements properties. The previous examples had an extra 'readonly' property to be added to the html element, this type of property does not take a value, as such you should not provide one.

### innerValue and Context
While these properties are fully functional I find their usage only situational

'context' will instantly bind child elements to an existing html element,
```js
Jrend({
  context: '#id1'
  value: {
    tag: 'span',
    value: 'hello world'
    }
  });
```
this will attach the new 'span' element to the existing element with the id of #id, context accepts any css selector value, or a HTMLElement can be directly passed as a value.

'innerValue' is used to force a value to an element, this can be used in case your 'value' property is already in use
```js
Jrend({
  tag: 'h1',
  innerValue: 'hello ',
  value: {
    tag: 'span'
    value: 'world!'
    }
  });
// <h1>hello <span>world</span></h1>
```
