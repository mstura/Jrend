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
### example:
  Jrend({tag: 'h1', value: 'hello world'});
