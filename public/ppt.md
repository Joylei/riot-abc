name: inverse
layout: true
class: center, middle, inverse
---
#riot.js
.center[![](./img/riot240x.png)]
latest v3.0.2
---
## What is it and why should I be using it?
---
layout: false
.left-column[
  ## What is it?
]
.right-column[
  Simple and elegant component-based UI library, featuring:

- CUSTOM TAGS

- ENJOYABLE SYNTAX

- ELEGANT API

- TINY SIZE

.footnote[.red[*] support modern browsers,IE9+]
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
CUSTOM TAGS

Riot brings custom tags to all browsers.
A custom tag glues relevant HTML and JavaScript together forming a reusable component.

```html
<clock>
    <!--layout-->
    <p>The time is { time }</p>
    <!--style-->
    <style>
      p{ font-size:1.5 em; }
    </style>
    //logics
    var self = this;
    var id = setInterval(function(){
        self.time = new Date().toLocaleTimeString()
        self.update()
    }, 1000)
    self.on('unmount', function(){ clearInterval(id) })
</clock>
```

.footnote[.red[*] see the example: [Clock](./examples/clock/)]
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Human-readable

Custom tags let you build complex views with HTML. Your application might look something like this:

```html
<body>

  <h1>Acme community</h1>

  <forum-header/>

  <div class="content">
    <forum-threads/>
    <forum-sidebar/>
  </div>

  <forum-footer/>

  <script>riot.mount('*', { api: forum_api })</script>
</body>
```

Riot tags are converted to pure JavaScript before browsers can execute them.
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
DOM Expressions binding

- Absolutely the smallest possible amount of DOM updates and reflows
- One way data flow: updates and unmounts are propagated downwards from parent to children
- Expressions are pre-compiled and cached for high performance
- Lifecycle events for more control
- Server-side rendering of custom tags for universal (isomorphic) applications

]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Close to standards

- No proprietary event system
- No need for external polyfills or additional libraries
- The rendered DOM can be freely manipulated with other tools
- No extra HTML root elements or data- attributes
- Plays well with jQuery
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Tooling friendly

- Create tags with ES6, Typescript, CoffeeScript, Jade, LiveScript or any pre-processor you want
- Integrate with NPM, CommonJS, AMD, Bower or Component
- Develop with Gulp, Grunt or Browserify plugins
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Enjoyable syntax

One of the design goals was to introduce a powerful tag syntax with as little boilerplate as possible:

- Power shortcuts: class={ enabled: is_enabled, hidden: hasErrors() }
- No extra brain load such as render, state, constructor
- Interpolation: Add #{ items.length + 1 } or class="item { selected: flag }"
- The &lt;script&gt; tag to enclose the logic is optional
- Compact ES6 method syntax
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Small learning curve

Riot has between 10 and 100 times fewer API methods than other UI libraries.

- Less to learn. Fewer books and tutorials to view
- Less proprietary stuff and more standard stuff
]
---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
Tiny size

polymer.html – 45.69KB (gzip)

react.min.js – 45.05KB (gzip)

riot.min.js – 9.81KB (gzip)

- Fewer bugs
- Faster to parse and cheaper to download
- Embeddable. The library ought to be smaller than the application
- Less to maintain. We don’t need a big team to maintain Riot
]
---
template: inverse

## How does it work, then?
---
name: how
.left-column[
  ## How does it work?
### - Tag Syntax
]
.right-column[
A tag is defined like:
```html
<app>
  <!--layout-->
  <h1>{ title }</h1>
  <!--script-->
  <script>
    this.title = 'A Tag'
  </script>
  <!--style-->
  <style>
    h1 {font-size: 2em;}
  </style>
</app>
```
]

--
.right-column[
- script is optional
- need to have good indents, otherwise it will not be compiled correctly
- Quotes are optional: &lt;foo bar={ baz }&gt; becomes &lt;foo bar="{ baz }"&gt;
- All attribute names must be lowercase. This is due to browser specification
- Tag definition root may also have attributes: &lt;foo onclick={ click } class={ active: active }&gt;
]
---
.left-column[
  ## How does it work?
### - Tag syntax
### - Tag styling
]
.right-column[
from riot@3.0, style is default to be scoped
```html
<todo-item>
  <p>{ opts.item }</p>
  <style>
    :scope{
        border: 1px solid gray;
    }
    p { color:red; } 
  </style>
</todo-item>
```
]
--
.right-column[
when mounting the tag, the style will be injected into document
```html
<style type="text/css">
todo-item,[data-is="todo-item"]{ border: 1px solid gray; }
todo-item p,[data-is="todo-item"] p{ color:red; }
</style>
```
]
---
.left-column[
  ## How does it work?
  ### - Tag syntax
  ### - Tag styling
  ### - Mounting
]
.right-column[
mount all tags on the page

```js
riot.mount('*')
```

mount a specified tag

```js
riot.mount('app')
```

mount a specified tag to a given element

```js
riot.mount('app', document.querySelector('#app'))
```

]
---
.left-column[
  ## How does it work?
  ### - Tag syntax
  ### - Tag styling
  ### - Mounting
  ### - Access dom elements
]
.right-column[
you can access dom elements by refs after the tag get mounted

```html
<app>
  <h1 ref="title">The title</h1>
  var self = this
  self.on('mount', function(){
    console.log(self.refs.title)
  })
</app>
```

- refs can also work on tags
- more that one element with the same ref name, the result is an array

]
---
.left-column[
  ## How does it work?
  ### - Tag syntax
  ### - Tag styling
  ### - Mounting
  ### - Access dom elements
  ### - Options
]
.right-column[

you can use options when mounting tags
```html
<app>
  <h1>{ opts.title }</h1>
</app>
```

```js
riot.mount('app', { title: 'riot rocks' })
```
]
---
.left-column[
  ## How does it work?
  ### - Tag syntax
  ### - Tag styling
  ### - Mounting
  ### - Access dom elements
  ### - Options
]
.right-column[

The other way is passed to child tags
```html
<child>
  <p>{ opts.name }</p>
</child>
```
```html
<app>
  <p>Riot</p>
  <child name={ name }></child>
  this.name = 'in child tag'
</app>
```
]
---
.left-column[
  ## How does it work?
  ### - Tag syntax
  ### - Tag styling
  ### - Mounting
  ### - Access dom elements
  ### - Options
  ### - Expressions
]
.right-column[

Expressions are 100% JavaScript. A few examples:
```js
{ title || 'Untitled' }
{ results ? 'ready' : 'loading' }
{ new Date() }
{ message.length > 140 && 'Message is too long' }
{ Math.round(rating) }
```
]
---
.left-column[
  ## How does it work?
  ### - Tag styling
  ### - Mounting
  ### - Access dom elements
  ### - Options
  ### - Expressions
  ### - Event Handlers
]
.right-column[

```html
<app>
  <a href="#" onclick="{ click }">A Link</a>

  this.click = function(e){
    console.log(e)
    alert('A clicked')
  }
</app>
```
]
---
.left-column[
  ## How does it work?
  ### - Mounting
  ### - Access dom elements
  ### - Options
  ### - Expressions
  ### - Event Handlers
  ### - Conditionals
]
.right-column[
Conditional control attributes:
- if:   the element will be removed if the result of the expression is false
- show: hide the element by change style.display=''
- hide: hide the element by change style.display='none'

```html
<app>
  <p if="{ visible }">show when visible</p>
  <a href="#" onclick="{ click }">toggle</a>
  var self = this
  this.visible = false
  this.click = function(e){
    self.visible = !self.visible
  }
</app>
```
]
---
.left-column[
  ## How does it work?
  ### - Access dom elements
  ### - Options
  ### - Expressions
  ### - Event Handlers
  ### - Conditionals
  ### - Loops
]
.right-column[

Loops are implemented with each attribute as follows

```html
<todo>
  <ul>
    <li each={ items } class={ completed: done }>
      <input type="checkbox" checked={ done }> { title }
    </li>
  </ul>

  this.items = [
    { title: 'First item', done: true },
    { title: 'Second item' },
    { title: 'Third item' }
  ]
</todo>
```
]
---
template: inverse

## It's time to get started!
---
.left-column[
  ## Getting started
]
.right-column[
Getting up and running is done in only a few steps:

1. Visit the [project site](http://riotjs.com/)

2. [Try and Play](http://riotjs.com/play/)
]
---
name: last-page
template: inverse

## That's all!