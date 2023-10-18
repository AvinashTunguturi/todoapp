import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./index.css";

class CreateTask extends Component {
  state = {
    isTaskEmpty: false,
    taskName: "",
    newTask: {},
  };

  onChangeTaskName = (event) => {
    this.setState({
      taskName: event.target.value,
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { taskName } = this.state;

    if (taskName === "") {
      this.setState({
        isTaskEmpty: true,
      });
    } else {
      const { addTodoItem } = this.props;

      console.log("taskName", taskName);

      const newTask = {
        id: uuidv4(),
        title: taskName,
        completed: false,
      };

      addTodoItem(newTask);

      this.setState({
        taskName: "",
        isTaskEmpty: false,
      });
    }
  };

  render() {
    const { isTaskEmpty, taskName } = this.state;
    return (
      <div className="create-task-section">
        <h1 className="form-heading">Create Task</h1>
        <form
          className="create-task-form-container"
          onSubmit={this.onSubmitForm}
        >
          <div className="input-error-container">
            <input
              type="text"
              value={taskName}
              placeholder="What needs to be done?"
              className="add-task-input-filed"
              onChange={this.onChangeTaskName}
            />
            {isTaskEmpty && (
              <p className="error-text">Task Should not be empty</p>
            )}
          </div>
          <button type="submit" className="add-todo-button">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default CreateTask;
