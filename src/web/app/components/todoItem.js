import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {ESCAPE_KEY, ENTER_KEY} from '../constants';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.title,
      editing: false
    };
  }

  handleSave(e) {
    let val;
    switch (e.target.className) {
    case 'toggle':
      this.props.model.toggle({id: this.props.id, completed: !this.props.completed});
      return;
    case 'edit':
      val = this.state.editText.trim();
      if (val) {
        this.setState({editing: false});
        this.props.model.save({id: this.props.id, title: val});
        return;
      } else {
        this.props.model.destroy({id:this.props.id});
        return;
      }
    case 'destroy':
      this.props.model.destroy({id:this.props.id});
      return;
    default:

    }
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.title, editing: false});
    } else if (e.which === ENTER_KEY) {
      this.handleSave(e);
    }
  }

  handleEdit() {
    this.setState({editing: true});
  }

  handleChange(e) {
    if (this.state.editing) {
      this.setState({editText: e.target.value});
    }
  }

  render() {
    return (
    <li className={classNames({
      completed: this.props.completed,
      editing: this.state.editing
    })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.completed}
          onChange={this.handleSave.bind(this)}
        />
        <label onDoubleClick={this.handleEdit.bind(this)}>{this.props.title}</label>
        <button className="destroy" onClick={this.handleSave.bind(this)} />
      </div>
      <input
        ref={input => input && input.focus()}
        className="edit"
        value={this.state.editText}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        onBlur={this.handleSave.bind(this)}
      />
    </li>
    );
  }
}

TodoItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  model: PropTypes.any
};

export default TodoItem;
