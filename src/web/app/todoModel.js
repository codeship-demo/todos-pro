import 'whatwg-fetch';
import {TODOS_URL} from './constants';
import _ from 'lodash';

export default class TodoModel {
  constructor(onChange) {
    this.onChange = onChange;
    this.fetch(TODOS_URL)
    .then(res => {
      this.todos = res;
      this.onChange(this.todos);
    });
  }

  fetch(url, method='GET', data) {
    let opts = {};
    opts.method = method;
    data ? opts.body = JSON.stringify(data) : false;
    opts.headers = {'Content-Type': 'application/json'};
    return fetch(url, opts)
      .then(res => {
        if (res.status === 204) return;
        return res.json();
      })
      .catch(err => Promise.reject(Error(`:::Server Error:::${err}`)));
  }

  create(title) {
    this.fetch(TODOS_URL, 'POST', {title:title} )
    .then(res => {
      this.todos.push(res);
      this.onChange(this.todos);
    });
  }

  update(todo) {
    todo.url ? delete todo.url: false;
    return this.fetch(`${TODOS_URL}/${todo.id}`, 'PATCH', todo );
  }

  delete(todo) {
    return this.fetch(`${TODOS_URL}/${todo.id}`, 'DELETE');
  }


  save(todoToSave) {
    this.update(todoToSave).then(res => {
      this.todos = this.todos.map(function (todo) {
        return todo.id !== todoToSave.id ? todo : res;
      });
      this.onChange(this.todos);
    });
  }

  destroy(todo) {
    this.delete(todo).then(() => {
      this.todos = this.todos.filter(function (candidate) {
        return candidate.id !== todo.id;
      });
      this.onChange(this.todos);
    });
  }

  toggle(todoToToggle) {
    this.update(todoToToggle).then(res => {
      this.todos = this.todos.map(function (todo) {
        return todo.id !== todoToToggle.id ? todo : res;
      });
      this.onChange(this.todos);
    });
  }

  toggleAll(checked) {
    const proms = this.todos.map(todo => {
      todo = _.extend({}, todo, {completed: checked});
      return this.update(todo).then(res => res);
    });

    Promise.all(proms).then(todos => {
      this.todos = todos;
      this.onChange(this.todos);
    });
  }

  clearCompleted() {
    const completedTodos = this.todos.filter(todo => {
      return todo.completed;
    });

    const proms = completedTodos.map(todo => {
      return this.delete(todo).then(res => res);
    });

    Promise.all(proms).then(() => {
      this.todos = this.todos.filter(todo => {
        return !todo.completed;
      });
      this.onChange(this.todos);
    });
  }
}
