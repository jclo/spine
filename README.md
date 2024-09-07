# Spine

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![License][license-image]](LICENSE.md)

A tiny MVC framework freely inspired by Backbone.js.


## Spine API

| <div style="width:200px">Static Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| noConflict                | returns a reference to this Spine object         |
| whoami                    | returns the name and the version of the library  |
| fetch                     | execute an HTTP request (GET, POST, PUT, DELETE) |
| urify                     | extends an Uri with the query parameters         |


## Spine.Model API

| <div style="width:200px">Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| Spine.Model({})           | returns a child constructor                      |
| **Empty Methods**         |                                                  |
| $initialize               | makes the init when the object is created        |
| $listen                   | listens for model events                         |
| $parse                    | parses the downloaded object or bypass           |
| **Public Methods**        |                                                  |
| $get                      | returns the value of the passed-in property      |
| $getAll                   | returns an object with keys/vals of the model    |
| $set                      | sets or updates model property(ies)              |
| $remove                   | removes one or a set of model property(ies)      |
| $has                      | checks if the model has the passed-in property   |
| $fetch                    | retrieves a model from the server                |
| $save                     | sends a model subset (changed prop) to the server|
| $delete                   | deletes a model from the server                  |
| $urify                    | extends an Uri with the query parameters         |
| **Public Events Methods** |                                                  |
| $on                       | listens for an event                             |
| $one                      | listens for an event once                        |
| $off                      | stops Listening the passed-in event              |
| $fire                     | fires an event                                   |
| $trigger                  | fires an event (alias)                           |

| <div style="width:200px">Events</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| change                    | fired by 'set' on model change                   |
| change:prop               | fired by 'set' on model property change          |
| remove                    | fired by 'remove' when all properties deleted    |
| remove:prop               | fired by 'remove' when a property deleted        |
| load                      | fired by 'fetch' when model loaded from server   |
| save                      | fired by 'save' when model saved on server       |
| delete                    | fired by 'delete' when model deleted from server |


## Spine.Collection API

| <div style="width:200px">Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| Spine.Collection({})      | returns a child constructor                      |
| **Empty Methods**         |                                                  |
| $initialize               | makes the init when the object is created        |
| $listen                   | listens for model events                         |
| $parse                    | parses the downloaded array of objects or bypass |
| **Public Methods**        |                                                  |
| $get                      | returns a model from its cid or id               |
| $each                     | returns the models one by one                    |
| $next                     | returns the next model from the given model      |
| $previous                 | returns the previous model from the given model  |
| $length                   | returns the number of models in the collection   |
| $empty                    | deletes a collection (not from server)           |
| $add                      | adds one or more objects to the collection       |
| $remove                   | removes model(s) from the collection             |
| $fetch                    | retrieves new models from the server and appends them to the collection |
| $save                     | sends a collection subset (changed prop) to the server |
| $delete                   | deletes a set of models from the server and collection |
| $urify                    | extends an Uri with the query parameters         |
| **Public Events Methods** |                                                  |
| $on                       | listens for an event                             |
| $one                      | listens for an event once                        |
| $off                      | stops Listening the passed-in event              |
| $fire                     | fires an event                                   |
| $trigger                  | fires an event (alias)                           |

| <div style="width:200px">Events</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| add                       | fired by the 'add' method for each added model   |
| addcomplete               | fired by 'add' when all added                    |
| load                      | fired by the 'fetch' method                      |
| save                      | fired by 'save' when collection saved on server  |
| remove                    | fired by the 'remove' method for each model removed |
| removecomplete            | fired by the 'remove' when all removed           |
| delete                    | fired by 'delete' when model deleted from server |


## Spine.View API

| <div style="width:200px">Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| Spine.View({})            | returns a child constructor                      |
| **Empty Methods**         |                                                  |
| $initialize               | makes the init when the object is created        |
| $render                   | renders the view in the DOM                      |
| **Public Methods**        |                                                  |
| none                      |                                                  |
| **Public Events Methods** |                                                  |
| $on                       | listens for an event                             |
| $one                      | listens for an event once                        |
| $off                      | stops Listening the passed-in event              |
| $fire                     | fires an event                                   |
| $trigger                  | fires an event (alias)                           |


## Spine.Router

| <div style="width:200px">Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| Spine.Router({})          | returns a child constructor                      |
| **Empty Methods**         |                                                  |
| $initialize               | makes the init when the object is created        |
| **Public Methods**        |                                                  |
| $navigate                 | updates the url or triggers a route              |
| $getLastRoute             | returns the latest route stored in the history   |
| $stop                     | stops the router listening for hash changes      |


## Spine.History

| <div style="width:200px">Static Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| start                     | starts recording the route history               |
| stop                      | stops recording the route history                |
| isHistoryRunning          | returns the history state                        |
| get                       | returns the route in the history stack           |
| push                      | pushes a route in the stack                      |
| pop                       | removes the latest entered route and returns it  |


## Spine.Radio

| <div style="width:200px">Static Methods</div> | <div style="width:620px">Description</div> |
|:--------------------------|:-------------------------------------------------|
| on                        | listens for an event                             |
| one                       | listens for an event once                        |
| off                       | stops Listening the passed-in event              |
| fire                      | fires an event                                   |
| trigger                   | fires an event                                   |

## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/spine.svg?logo=npm&logoColor=fff&label=NPM+package
[release-image]: https://img.shields.io/github/release/jclo/spine.svg?include_prereleases
[commit-image]: https://img.shields.io/github/last-commit/jclo/spine.svg?logo=github
[ci-image]: https://github.com/jclo/spine/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/spine/master.svg?&logo=coveralls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/spine.svg
[license-image]: https://img.shields.io/npm/l/@mobilabs/spine.svg

[npm-url]: https://www.npmjs.com/package/@mobilabs/spine
[release-url]: https://github.com/jclo/spine/tags
[commit-url]: https://github.com/jclo/spine/commits/main
[ci-url]: https://github.com/jclo/spine/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/spine?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/spine
[license-url]: http://opensource.org/licenses/MIT