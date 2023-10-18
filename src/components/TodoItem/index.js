import { Component } from "react";
import "./index.css";

class TodoItem extends Component {
  state = {
    editTask: false,
  };

  onClickEdit = () => {
    this.setState({
      editTask: true,
    });
  };

  onCheckTodoItem = (event) => {
    const { changeCheckedStatus, todoDetails } = this.props;
    const { id } = todoDetails;
    const checkedStatus = event.target.checked;
    changeCheckedStatus(id, checkedStatus);
  };

  onEditTaskName = (event) => {
    const { editTodoItem, todoDetails } = this.props;
    const { id } = todoDetails;
    const editedTask = event.target.value;
    editTodoItem(id, editedTask);
  };

  onCompleteEdit = () => {
    this.setState({
      editTask: false,
    });
  };

  onClickDelete = () => {
    const { deleteTodo, todoDetails } = this.props;
    const { id } = todoDetails;
    deleteTodo(id);
  };

  render() {
    const { todoDetails } = this.props;
    const { editTask } = this.state;
    const { title, completed } = todoDetails;
    const completedTask = completed ? "completedTask" : "";

    return (
      <li className={`todo-item ${completedTask}`}>
        <div className="check-box-task-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={this.onCheckTodoItem}
          />

          {editTask ? (
            <input
              type="text"
              onChange={this.onEditTaskName}
              onBlur={this.onCompleteEdit}
              className="title"
            />
          ) : (
            <p className="title">{title}</p>
          )}
        </div>
        <div>
          <button
            type="button"
            className="button edit"
            onClick={this.onClickEdit}
          >
            Edit
          </button>
          <button
            type="button delete"
            className="button"
            onClick={this.onClickDelete}
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
