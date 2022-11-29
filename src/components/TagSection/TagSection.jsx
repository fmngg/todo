import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { filteredArr, filterTag } from "../../redux/slices/ToDos";

import styles from "./TagSection.module.scss";

const TagSection = () => {
  const tags = useSelector((state) => state.todos.tags);
  const filter = useSelector((state) => state.todos.filterTag);

  const dispatch = useDispatch();

  const filterHandler = (title) => {
    dispatch(filterTag(title));
  };

  return (
    <div className={styles.tagSection}>
      {filter === "" ? (
        <>
          {tags.length > 0 ? (
            tags.map((obj) => (
              <p
                onClick={() => filterHandler(obj.tagTitle)}
                className={styles.tag}
                key={obj.tagId}
              >
                # {obj.tagTitle}
              </p>
            ))
          ) : (
            <p>Нет тегов</p>
          )}
        </>
      ) : (
        <>
          <FiArrowLeft
            onClick={() => {
              filterHandler("");
              dispatch(filteredArr([]));
            }}
            className={styles.back}
          />
          <p className={styles.filtered}># {filter}</p>
        </>
      )}
    </div>
  );
};

export default TagSection;
