---
name: 'view'
title: 'An Introduction to View'
description: '-'
---

# Introduction to View

**Spine.View** allows you to organize the visual panels of your app on the browser. You can create a view like this:

```js
const View = Spine.View({
  // Called the the view component is created; 
  $initialize() {
    return this;
  },

  // Called after the view component is created.
  $listen() {
    return this;
  },

  // Renders an element to the DOM.
  // ($render is not called, you must call it)
  $render() {
    return this;
  },
});
```

If you just want to add a title to the DOM, you can proceed like this:

```js
const View = Spine.View({
  $initialize() {
    this.$render();
    return this;
  },

  $render() {
    const el = document.getElementById('app');
    const title = document.createElement('h1')
    title.textContent = 'Hi!';
    el.append(title);
    return this;
  },
});
```

But, this is not the purpose of View. The added value of **View** is to be the interface between the server through **Collections** and **Models** and the web components to provide or retrieve data.

**RView** is the library dedicated to create and manage web components. Then, the web components could send messages to **View** for requesting an action.


--  oOo ---
