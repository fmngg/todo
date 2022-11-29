import React from "react";

import { v4 } from "uuid";

import { useDispatch } from "react-redux/es/exports";
import { addToDo, addTag } from "../../redux/slices/ToDos";

import styles from "./Input.module.scss";

const Input: React.FC = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const createToDo = () => {
    const todoId = v4();
    dispatch(addToDo({ id: todoId, text: value, tags: [] }));
    value.split(" ").forEach((obj) => {
      if (obj[0] === "#") {
        dispatch(
          addTag({
            id: todoId,
            tag: { tagId: v4(), tagTitle: obj.substring(1).toLowerCase() },
          })
        );
      }
    });
    setValue("");
  };

  const onKeyPressHandler = (e: any) => {
    if (e.keyCode === 13) {
      createToDo();
      e.target.blur();
    }
  };

  return (
    <div className={styles.input}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => onKeyPressHandler(e)}
        placeholder="Купить..."
        type="text"
      />
      <button onClick={createToDo}>Создать</button>
    </div>
  );
};

export default Input;
