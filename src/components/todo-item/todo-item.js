import {PropTypes} from 'react';
import * as ko from 'knockout';

import koComponent from '../../util/ko-component/ko-component';

ko.components.register('todo', {
  viewModel({id, text, onRemove}) {
    this.id = id;
    this.text = text;
    this.removeTodo = onRemove;
  },
  template: `
    <li>
      <span data-bind="text: text"></span>
      <a href="#" data-bind="click: () => removeTodo(id)">Remove</a>
    </li>
  `
});

const TodoItem = koComponent('todo');
TodoItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onRemove: PropTypes.func
};

export default TodoItem;
