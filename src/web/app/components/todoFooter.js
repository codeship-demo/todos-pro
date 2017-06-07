import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from '../constants';

const TodoFooter = ( {nowShowing, active, complete, model} ) => {

  function clearCompleted() {
    model.clearCompleted();
  }

  return (active || complete) ? (
		<footer className="footer">
			<span className="todo-count">
				<strong>{active}</strong> todo{active === 1 ? null : 's'} left
			</span>
			<ul className="filters">
				<li>
					<a href="#/" className={classNames({selected: nowShowing === ALL_TODOS})}>All</a>
				</li>
				<li>
					<a href="#/active" className={classNames({selected: nowShowing === ACTIVE_TODOS})}>Active</a>
				</li>
				<li>
					<a href="#/completed" className={classNames({selected: nowShowing === COMPLETED_TODOS})}>Completed</a>
				</li>
			</ul>
			{complete > 0 ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      ) : null }
		</footer>
  ) : null;
};

TodoFooter.propTypes = {
  nowShowing: PropTypes.string,
  active: PropTypes.number,
  complete: PropTypes.number,
  model: PropTypes.any
};

export default TodoFooter;
