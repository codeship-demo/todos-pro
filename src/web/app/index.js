import React from 'react';
import ReactDOM from 'react-dom';

import TodoModel from './todoModel';
import TodoApp from './components/todoApp';

import '../css/styles.css';

const model = new TodoModel(render);

function render(todos) {
  ReactDOM.render(
    <TodoApp todos={todos} model={model} />,
    document.getElementsByClassName('todoapp')[0]
  );
}
