import React from 'react';
import PropTypes from 'prop-types';
import {Router} from 'director/build/director';
import TodoFooter from './todoFooter';
import TodoList from './todoList';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ESCAPE_KEY, ENTER_KEY} from '../constants';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      newTodo: ''
    };
  }

  componentDidMount() {
    const setState = this.setState;

    const router = Router({
      '/': setState.bind(this, {nowShowing: ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
    });

    router.init('/');
  }

  handleChange(e) {
    this.setState({newTodo: e.target.value});
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({newTodo: ''});
    }
    if (e.which === ENTER_KEY) {
      e.preventDefault();
      const val = this.state.newTodo.trim();

      if (val) {
        this.props.model.create(val);
        // this.props.model.addTodo(val);
        this.setState({newTodo: ''});
      }
    }

    return;

  }

  getCounts() {
    var active = this.props.todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var complete = this.props.todos.length - active;
    return {active, complete};
  }

  filteredTodos() {
    return this.props.todos.filter(todo => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
      }
    });
  }

  clearCompleted() {
    // this.props.model.clearCompleted();
  }


  render() {
    const counts = this.getCounts.bind(this)();

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            value={this.state.newTodo}
            autoFocus={true}
          />
        </header>
        <TodoList
          todos={this.filteredTodos.bind(this)()}
          checked={counts.active === 0}
          model={this.props.model}
        />
        <TodoFooter
          {...counts}
          nowShowing={this.state.nowShowing}
          model={this.props.model}
        />
      </div>
    );
  }

}

TodoApp.propTypes = {
  todos: PropTypes.array,
  model: PropTypes.any
};

export default TodoApp;
