import React from "react";
import TagSection from "./components/TagSection/TagSection";
import ToDoSection from "./components/ToDoSection/ToDoSection";

import { useSelector } from "react-redux";
import { Rootstate } from "./redux/store";

function App() {
  const tags = useSelector((state: Rootstate) => state.todos.tags);
  const todos = useSelector((state: Rootstate) => state.todos.todos);

  React.useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [tags, todos]);

  return (
    <div className="app">
      <div className="wrapper">
        <TagSection />
        <ToDoSection />
      </div>
    </div>
  );
}

export default App;
