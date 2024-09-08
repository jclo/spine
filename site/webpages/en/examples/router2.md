---
name: 'router2'
title: 'A More Sophisticated Router'
description: '-'
---

# A More Sophisticated Router

**Spine.Router** supports routes (links) with params.  In your html create links like that:

```html
<div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#page1/1/2">Page 1</a></li>
    <li><a href="#page2?a=10&b=20">Page 1</a></li>
  </ul>
</div>
```

Then define your routes in such a way that you get the passed parameters in the params variable:

```js
const Router = Spine.Router({
  routes: {
    '': 'home',
    home: 'home',
    page1: 'page1',
    'page1/:aaa/:bbb': 'page1',
    page2: 'page2',
  },

  // Called when the router is  created.
  $initialize() {
    return this;
  },

  // Called when the user clicks on the link # or #home
  home(params) {
    // params: undefined
    return this;
  },

  // Called when the user clicks on the link #page1
  page1(params) {
    // params: {aaa: 1, bbb: 2}
    return this;
  },

  // Called when the user clicks on the link #page2
  page2(params) {
    // params: {a: 10, b: 20}
    return this;
  }
```


--  oOo ---
