---
name: 'model'
title: 'Introduction to Model'
description: '-'
---

# Introduction to Model

A **Spine.Model** is an object you can retrieve from the server or save to it.


## Define a model

Defining a model is very simple. It must only contains the address to fetch it from the server:

```js
const Model = Spine.Model({
  url: '/examples/api/v1/account',
});
```

You can assign default values to the properties of your model like this:
```js
const Model = Spine.Model({
  url: '/examples/api/v1/account',
  default: {
    aaa: 'aaa',
  },
});
```

You can also execute a post-processing operation on the properties when the model is created by adding the **$parse** method:

```js
const Model = Spine.Model({
  url: '/examples/api/v1/account',
  default: {
    aaa: 'aaa',
  },

  $parse(properties) {
    // do something
    return properties;
  },
});
```

## Create a model

When your model is defined, you can create it and retrieve its content from the server:

```js
const m = Model();
m.$fetch((err, resp) => {
  //
});
```

You can also create and fill it locally:

```js
const m = Model({ a: 1, b: 2 });

// or:
const m = Model();
m.$add({ a: 1, b: 2 });
```

## Set or retrieve properties

You can read or write/update a property like this:

```js
// Read
const a = m.$get('a');
// Update
const m.$set('b', 123);
```

This is just an introduction to **Spine Model**. Go to **API** to see all the operations you can execute on a model.


--  oOo ---
