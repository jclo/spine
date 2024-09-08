---
name: 'radio'
title: 'Introduction Radio'
description: '-'
---

# Radio

**Spine.Radio** provides communication inside the *app* through backbone channels.


## Listen a channel

A component can listen message coming from a channel like this:

```js
Spine.Radio.on('channel/name', (message) => {
  //
});
```


## Send messages on a channel

A component can send messages to a channel like this:

```js
Spine.Radio.fire('channel/name', message);
```


## Unsubscribe to a channel

A component can unsubscribe from a channel like this:

```js
const handler = function(message) {
  //
};

// subscribe:
Spine.Radio.on('channel/name', handler);

// unsubscribe:
Spine.Radio.off('channel/name', handler);
```


--  oOo ---
