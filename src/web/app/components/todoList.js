import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './todoItem';

const TodoList = ( {todos, checked, model} ) => {

  const listTodos = () => {
    return todos.map((todo) => <TodoItem key={todo.id} {...todo} model={model} />);
  };

  function handleToggleAll(e) {
    const checked = e.target.checked;
    model.toggleAll(checked);
  }

  return todos.length ? (
    <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={handleToggleAll}
          checked={checked}
        />
      <ul className="todo-list">
        {listTodos()}
      </ul>
    </section>
  ) : null;
};

TodoList.propTypes = {
  todos: PropTypes.array,
  checked: PropTypes.bool,
  model: PropTypes.any
};

export default TodoList;
