---
name: 'view2'
title: 'View with RView'
description: '-'
---

# View with  RView

**RView** is the library dedicated to create and manage web components. **View** must use it like this:

```js
const View = Spine.View({
  $initialize() {
    const app = this.$render();
    return this;
  },

  $listen() {
    this.app.$listen('identification/used/by/the/web/component/listened', (message) => {
      //
    });
  },

  $render() {
    return RView.render({
      el: anchor,
      children: { '<App />': App },
      template: `
        <div>
          <App />
        </div>
      `,
    });
  },
});
```

On the above code, **render** method calls RView to render the **app** to the DOM (see documentation on RView [here](https://mobilabs.org/rview){target=_blank}.

Then the **listen** method could listen for messages coming from the web components of the **app** and respond accordingly.


--  oOo ---
