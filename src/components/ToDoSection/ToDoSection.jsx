import React from "react";
import Input from "../Input/Input";
import ToDo from "../ToDo/ToDo";
import { useSelector, useDispatch } from "react-redux";
import { filteredArr } from "../../redux/slices/ToDos";

import styles from "./ToDoSection.module.scss";

const ToDoSection = () => {
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filterTag);
  const filtered = useSelector((state) => state.todos.filteredArr);
  const newTodos = [];

  const dispatch = useDispatch();

  React.useEffect(() => {
    todos.forEach((todo) =>
      todo.tags.forEach((tag) => {
        if (tag.tagTitle === filter) {
          newTodos.push(todo);
        }
      })
    );
    dispatch(filteredArr(newTodos));
  }, [filter]);

  return (
    <>
      {filter === "" ? (
        <>
          <Input />
          <div className={styles.todo}>
            {todos.map((obj) => (
              <ToDo key={obj.id} id={obj.id} text={obj.text} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.todo}>
          {filtered &&
            filtered.map((obj) => (
              <ToDo key={obj.id} id={obj.id} text={obj.text} />
            ))}
        </div>
      )}
    </>
  );
};

export default ToDoSection;
