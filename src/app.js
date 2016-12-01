import * as ko from 'knockout';
import uuid from 'node-uuid';

const viewModel = {
  name: 'James',
  todos: ko.observableArray(),
  newTodo: ko.observable(''),
  addTodo() {
    const todo = {
      id: uuid.v4(),
      text: this.newTodo()
    };
    this.todos.push(todo);
    this.newTodo('');
  },
  removeTodo(id) {
    this.todos.remove(todo => todo.id === id);
  }
};

ko.components.register('todo', {
  viewModel({todo, onRemove}) {
    this.id = todo.id;
    this.text = todo.text;
    this.removeTodo = onRemove;
  },
  template: `
    <li>
      <span data-bind="text: text"></span>
      <a href="#" data-bind="click: () => removeTodo(id)">Remove</a>
    </li>
  `
});

ko.applyBindings(viewModel, document.getElementById('#app'));

document.body.style.display = 'block';
