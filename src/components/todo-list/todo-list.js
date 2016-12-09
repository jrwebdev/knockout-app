import React from 'react';
import uuid from 'node-uuid';

import TodoItem from '../todo-item/todo-item';

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: [{
        id: uuid.v4(),
        text: 'Todo 1'
      }, {
        id: uuid.v4(),
        text: 'Todo 2'
      }, {
        id: uuid.v4(),
        text: 'Todo 3'
      }]
    };
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(id) {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({todos: updatedTodos});
  }

  render() {

    const todos = this.state.todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        text={todo.text}
        onRemove={this.onRemove}
      />
    ));

    return <ul>{todos}</ul>;
  }

}

export default TodoList;
