import React, { useContext, useState, useEffect } from 'react';
import TodoContext from '../../../context/todo/todoContext';

import M from 'materialize-css/dist/js/materialize.min';

const EditTodoModal = () => {
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const todoContext = useContext(TodoContext);
  const { updateTodo, current } = todoContext;

  useEffect(() => {
    if (current) {
      setDescription(current.description);
      setCompleted(current.completed);
    }
  }, [current]);

  const onSubmit = e => {
    e.preventDefault();
    if (description === '') {
      M.toast({
        html: '<span class="red-text">Description cannot be empty</span>'
      });
    } else {
      const updTodo = {
        id: current.id,
        description,
        completed
      };
      updateTodo(updTodo);

      // Clear Fields
      setDescription('');
      setCompleted(false);
    }
  };

  return (
    <div id="edit-todo-modal" className="modal">
      <div className="modal-content">
        <h4 className="center">Edit a Todo</h4>
        <form onSubmit={onSubmit}>
          <div className="card-content">
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  name="description"
                  className="materialize-textarea"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="input-field col s12">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name=""
                      className="filled-in"
                      checked={completed}
                      value={completed}
                      onChange={e => setCompleted(!completed)}
                    />
                    <span>Completed</span>
                  </label>
                </p>
              </div>
            </div>
            <div className="card-action right-align center text-white">
              <button
                className="btn blue waves-effect waves-light"
                type="submit"
              >
                Updated <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
