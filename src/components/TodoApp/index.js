import { Component } from "react";
import Header from "../Header";
import CreateTask from "../CreateTask";
import TabItem from "../TabItem";
import TodoItem from "../TodoItem";

import "./index.css";

const tabsList = [
  { tabId: "ALL TASKS", displayText: "All Tasks" },
  { tabId: "COMPLETED", displayText: "Completed" },
  { tabId: "INCOMPLETE", displayText: "Incomplete" },
];

class TodoApp extends Component {
  state = {
    todoList: [],
    activeTabId: tabsList[0].tabId,
  };

  componentDidMount() {
    this.getTodoItems();
  }

  getTodoItems = async () => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users/1/todos`;
    const response = await fetch(apiUrl);
    const todoList = await response.json();
    this.setState({
      todoList,
    });
  };

  addTodoItem = (newTask) => {
    console.log(newTask);
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newTask],
    }));
  };

  changeCheckedStatus = (id, checkedStatus) => {
    const { todoList } = this.state;

    console.log(checkedStatus);

    const newTodoList = todoList.map((eachTodo) => {
      if (eachTodo.id === id) {
        const changedStatusTask = { ...eachTodo, completed: checkedStatus };
        return changedStatusTask;
      }
      return eachTodo;
    });

    this.setState({
      todoList: newTodoList,
    });
  };

  editTodoItem = (id, editedTask) => {
    const { todoList } = this.state;

    const editedTodoList = todoList.map((eachTodo) => {
      if (eachTodo.id === id) {
        const modifiedTask = { ...eachTodo, title: editedTask };
        return modifiedTask;
      }
      return eachTodo;
    });

    this.setState({
      todoList: editedTodoList,
    });
  };

  deleteTodo = (id) => {
    const { todoList } = this.state;
    const filteredTodoList = todoList.filter((eachTodo) => eachTodo.id !== id);
    this.setState({
      todoList: filteredTodoList,
    });
  };

  setActiveTabId = (tabId) => {
    this.setState({ activeTabId: tabId });
  };

  getActiveTodoList = () => {
    const { todoList, activeTabId } = this.state;
    console.log(todoList);
    let filteredTodo;

    switch (activeTabId) {
      case "COMPLETED":
        filteredTodo = todoList.filter(
          (eachTodoItem) => eachTodoItem.completed === true
        );
        return filteredTodo;

      case "INCOMPLETE":
        filteredTodo = todoList.filter(
          (eachTodoItem) => eachTodoItem.completed === false
        );
        return filteredTodo;

      default:
        return todoList;
    }
  };

  render() {
    const { activeTabId } = this.state;
    const activeTodoList = this.getActiveTodoList();
    return (
      <>
        <Header />
        <div className="todo-app">
          <CreateTask addTodoItem={this.addTodoItem} />
          <ul className="tabs-list">
            {tabsList.map((eachTab) => (
              <TabItem
                key={eachTab.tabId}
                tabDetails={eachTab}
                setActiveTabId={this.setActiveTabId}
                isActive={activeTabId === eachTab.tabId}
              />
            ))}
          </ul>
          <ul className="todo-list">
            {activeTodoList.map((eachTodo) => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                editTodoItem={this.editTodoItem}
                deleteTodo={this.deleteTodo}
                changeCheckedStatus={this.changeCheckedStatus}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default TodoApp;
