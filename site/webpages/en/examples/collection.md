---
name: 'collection'
title: 'Introduction to Collection'
description: '-'
---

# Introduction to Collection

A **Spine.Collection** is a set of models.

Imagine you have a model which is a book with its title and the author's name as properties.
A collection will be the library containing all these books.


## Define a Collection

You can define a collection with only two properties: the URL and the model to which it refers:

```js
const Model = Spine.Model({
  url: '/examples/api/v1/account',
});

const Collection = Spine.Collection({
  url: '/examples/api/v1/accounts',
  model: Model,
});
```

## Create a Collection

When your model and collection are defined, you can retrieve the collection from the server:

```js
const c = Collection();
c.$fetch((err, resp) => {
  //
});
```

You can also create and fill it locally:

```js
const c = Collection([{ a: 1, b: 2}, { a: 11, b: 22 }, {  a: 111, b: 222 }]);

// or:
const c = Collection();
c.$add([{ a: 1, b: 2}, { a: 11, b: 22 }, {  a: 111, b: 222 }]);
```

## Retrieve item

When an item is added to the collection, it gets an unique id. The **id** contains the prefix **c** followed by a number. The first added item is **c1**, the second is **c2**, etc.

You can retrieve it by specifying its id:

```js
const item = c.$get('c1');
```

This is just an introduction to **Spine Collection**. Go to **API** to see all the operations you can execute on a collection.


--  oOo ---
