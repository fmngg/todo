import React from "react";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  deleteToDo,
  editToDo,
  addTag,
  deleteTag,
} from "../../redux/slices/ToDos";
import { FiX, FiPlus } from "react-icons/fi";

import styles from "./ToDo.module.scss";

const ToDo = ({ id, text }) => {
  const elem = useSelector((state) =>
    state.todos.todos.find((todo) => todo.id === id)
  );
  const tags = useSelector(
    (state) => state.todos.todos[state.todos.todos.indexOf(elem)].tags
  );

  const [value, setValue] = React.useState(text);

  const dispatch = useDispatch();

  React.useState(() => {}, []);

  const onKeyPressHandler = (e) => {
    if (e.keyCode === 13) {
      dispatch(editToDo({ id, value }));
      e.target.blur();
    }
  };

  const addTagHandler = () => {
    const tagTitle = prompt("Введите тэг", "");
    dispatch(
      addTag({ id, tag: { tagId: v4(), tagTitle: tagTitle.toLowerCase() } })
    );
  };

  const deleteTagHandler = (tagId, tagTitle) => {
    dispatch(deleteTag({ id, tagId, tagTitle }));
  };

  const deleteTodoHandler = () => {
    tags.forEach((obj) =>
      dispatch(deleteTag({ id, tagId: obj.tagId, tagTitle: obj.tagTitle }))
    );
    dispatch(deleteToDo(id));
  };

  return (
    <div className={styles.todo}>
      <input
        type="text"
        onKeyDown={onKeyPressHandler}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <FiX onClick={deleteTodoHandler} className={styles.delete} />
      <div className={styles.tags}>
        <FiPlus onClick={addTagHandler} className={styles.add} />
        {tags.length > 0 ? (
          tags.map((obj) => (
            <p className={styles.tag} key={obj.tagId}>
              # {obj.tagTitle}
              <FiX
                onClick={() => {
                  deleteTagHandler(obj.tagId, obj.tagTitle);
                }}
                className={styles.tagDelete}
              />
            </p>
          ))
        ) : (
          <p>Нет тегов</p>
        )}
      </div>
    </div>
  );
};

export default ToDo;
