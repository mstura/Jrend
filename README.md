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
### tag and value
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

Jrend({
  tag: 'div'
  value: [
      {tag: 'span', value: 'hello'},
      {tag: 'span', value: 'world'}
    ]
  });
  
// <div>
//  <span>hello</span>
//  <span>world</span>
// </div>
```
### Defining 'args'
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



**Target audience:**

Users of the extension providing **Android technologies** support for the .

**Summary:** This document provides information about the extension providing **Android technologies** support for the .

Description
===========

This extension provides support for **Android technologies**.This extension works on top of the JEE analyzer.

In what situation should you install this extension?
----------------------------------------------------

If your JEE application source code uses **Android technologies** you should install this extension.

Features
--------

**UI Controls support**

Below given are the list of controls supported of this version release.

*   TextView
*   EditText
*   AutoCompleteTextView
*   Button
*   ImageButton
*   CheckBox
*   Spinner
*   TimePicker

**Android Event handling support**

*   OnClickListener()
*   OnLongClickListener()

**Android Layout Type support**

*   RelativeLayout
*   LinearLayout

**WebServices support**

Support for third-party WebServices is provided:

*   HTTPClient library with namespace _cz.msebera.android.httpclient_

Known Limitations
=================

*   End to End transactions are not currently resolved - this is an initial implementation to find the entry and end point for Android technologies.
*   Only Partial transactions are shown like widget → methods and methods → web service objects.
*   Right now android dont have DMT support, so extension will not recognize android project . User have to create jee analysis unit manually and add all files in castMS.

Supported Android versions
==========================

<table class="wrapped"><colgroup><col><col></colgroup><tbody><tr><th>Version</th><th>Supported</th></tr><tr><td>4.4 - 8.0</td><td style="text-align: center;"><div class="content-wrapper"><p><ac:image><ri:attachment ri:filename="image2018-6-11 14:18:56.png"></ri:attachment></ac:image></p></div></td></tr></tbody></table>

Function Point, Quality and Sizing support
==========================================

This extension provides the following support:

*   **Function Points (transactions)**: a green tick indicates that OMG Function Point counting and Transaction Risk Index are supported
*   **Quality and Sizing**: a green tick indicates that CAST can measure size and that a minimum set of Quality Rules exist

<table class="wrapped"><colgroup><col><col></colgroup><tbody><tr><th colspan="1">Function Points(transactions)</th><th colspan="1">Quality and Sizing</th></tr><tr><td style="text-align: center;" colspan="1"><div class="content-wrapper"><p><ac:image ac:alt="(tick)"><ri:url ri:value="http://doc.castsoftware.com/s/en_GB/6441/82994790ee2f720a5ec8daf4850ac5b7b34d2194/_/images/icons/emoticons/check.png"></ri:url></ac:image></p></div></td><td style="text-align: center;" colspan="1"><div class="content-wrapper"><p><ac:image><ri:attachment ri:filename="image2018-6-11 14:19:16.png"></ri:attachment></ac:image></p></div></td></tr></tbody></table>

CAST AIP compatibility
======================

This extension is compatible with:

<table class="wrapped"><colgroup><col><col></colgroup><tbody><tr><th><div class="tablesorter-header-inner">CAST AIP release</div></th><th><div class="tablesorter-header-inner">Supported</div></th></tr><tr><td colspan="1">8.3.x</td><td style="text-align: center;" colspan="1"><ac:emoticon ac:name="tick"></ac:emoticon></td></tr><tr><td colspan="1">8.2.x</td><td style="text-align: center;" colspan="1"><ac:emoticon ac:name="tick"></ac:emoticon></td></tr></tbody></table>

Supported DBMS servers
======================

This extension is compatible with the following DBMS servers:

<table class="wrapped"><colgroup><col><col><col><col></colgroup><tbody><tr><th>CAST AIP release</th><th>CSS</th><th>Oracle</th><th>Microsoft</th></tr><tr><td>All supported releases</td><td style="text-align: center;"><ac:emoticon ac:name="tick"></ac:emoticon></td><td style="text-align: center;"><ac:emoticon ac:name="tick"></ac:emoticon></td><td style="text-align: center;"><ac:emoticon ac:name="tick"></ac:emoticon></td></tr></tbody></table>

Prerequisites
=============

<table class="wrapped"><colgroup><col><col></colgroup><tbody><tr><td><ac:emoticon ac:name="tick"></ac:emoticon></td><td>An installation of any compatible release of CAST AIP (see table above)</td></tr></tbody></table>

Dependencies with other extensions
==================================

Some CAST extensions require the presence of other CAST extensions in order to function correctly. The **Android** extension requires that the following other CAST extensions are also installed:

*   **com.castsoftware.internal.platform** (internal extension)
*   **Web services linker service** (internal technical extension)

Note that:

*   when using the **CAST Extension Downloader** to download the extension and the** Manage Extensions** interface in **CAST Server Manager** to install the extension, any dependent extensions are **automatically** downloaded and installed for you. You do not need to do anything.
*   the JEE Analyzer is not a dependency, but since this extension is always installed with AIP, you do not need to do anything.

Download and installation instructions
======================================

Please see:

The latest of this extension can be seen when downloading it from the CAST Extend server.

Packaging, delivering and analyzing your source code
====================================================

Once the extension is installed, no further configuration changes are required before you can package your source code and run an analysis. The process of packaging, delivering and analyzing your source code does not change in any way:

*   **Package and deliver** your application in the exact same way as you always have. You can refer to the existing official CAST AIP documentation for more information about this - see:  .
*   **Analyze** your delivered application source code in the CAST Management Studio in the exact same way as you always have. You can refer to the existing official CAST AIP documentation for more information about configuring an analysis - see: 

What results can you expect?
----------------------------

Once the analysis/snapshot generation has completed, you can view the results in the normal manner. For example, the following code:

will generate an Enlighten view for widget objects like this:

and for web services, the following code sample:

will generate an Enlighten view for post operations for login as follows:

### objectsObjects

The following objects are displayed in CAST Enlighten:

| Icon | Description |
| --- | --- |
| 
 | 

Button

 |
| 

 | Image Button |
| 

 | AutoCompleteTextView |
| 

 | Checkbox |
| 

 | Spinner |
| 

 | Time Picker |
| 

 | Text View |
| 

 | Edit Text |
| 

 | OnClick() |
| 

 | Get Resource Service |
| 

 | Put Resource Service |
| 

 | Post Resource Service |
| 

 | Delete Resource Service 
