---
name: 'router1'
title: 'A Simple Router'
description: '-'
---

# A Simple Router

**Spine.Router** allows you to redirect clicks to the application. You can easily create a router like this:

```js
// Create your router object:
const Router = Spine.Router({
  routes: {
    '': 'home',
    home: 'home',
    page1: 'page1',
    page2: 'page2'
  },

  // Called when the router is  created.
  $initialize() {
    return this;
  },

  // Called when the user clicks on the link # or #home
  home() {
    return this;
  },

  // Called when the user clicks on the link #page1
  page1() {
    return this;
  },

  // Called when the user clicks on the link #page2
  page2() {
    return this;
  }
});
```

When our **Spine Router** is defined, you can launch it and start recording history:

```js
Spine.History.start();
Router();
```

And you can activate it by adding an HTML code like this:

```html
<div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#page1">Page 1</a></li>
    <li><a href="#page2">Page 2</a></li>
  </ul>
</div>
```


--  oOo ---
