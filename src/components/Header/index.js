import { LuListTodo } from "react-icons/lu";

import "./index.css";

const Header = () => {
  return (
    <header className="header">
      <LuListTodo className="app-icon" />
      <h1>ToDoApp</h1>
    </header>
  );
};

export default Header;
