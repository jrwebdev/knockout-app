# react-knockout-app

Proof of concept for using Knockout components within React.

The app has 3 main parts:

### `TodoList` ([components/todo-list](src/components/todo-list/todo-list.js))
A React component which renders one or more `TodoItem`s

### `TodoItem` (`components/todo-list`)
A Knockout component which is exported as a React component via use of `koComponent()`

### `koComponent` (`util/ko-component`)
A function which takes in a name of a Knockout component and generates a React component which handles passing properties between React and Knockout
