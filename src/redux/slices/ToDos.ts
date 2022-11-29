import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  tags: Array<Tag>;
}

interface Tag {
  tagId: string;
  tagTitle: string;
}

export interface MyState {
  todos: Array<Todo>;
  tags: Array<Tag>;
  filterTag: string;
  filteredArr: Array<Todo>;
}

const initialState = {
  // @ts-ignore
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  // @ts-ignore
  tags: JSON.parse(localStorage.getItem("tags")) || [],
  filterTag: "",
  filteredArr: [],
} as MyState;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteToDo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editToDo: (state, action) => {
      const elem = state.todos.find((todo) => todo.id === action.payload.id);

      if (!elem) throw new Error("elem is undefined");

      state.todos[state.todos.indexOf(elem)].text = action.payload.value;
    },
    addTag: (state, action) => {
      let repeat = false;
      let repeatInside = false;
      const elem = state.todos.find((todo) => todo.id === action.payload.id);
      if (!elem) throw new Error("elem is undefined");

      for (let index = 0; index < state.tags.length; index++) {
        if (state.tags[index].tagTitle === action.payload.tag.tagTitle) {
          repeat = true;
          break;
        }
      }

      for (
        let index = 0;
        index < state.todos[state.todos.indexOf(elem)].tags.length;
        index++
      ) {
        if (
          state.todos[state.todos.indexOf(elem)].tags[index].tagTitle ===
          action.payload.tag.tagTitle
        ) {
          repeatInside = true;
          break;
        }
      }

      if (repeat) {
        if (repeatInside) {
        } else {
          state.todos[state.todos.indexOf(elem)].tags.push(action.payload.tag);
        }
      }

      if (repeat === false && repeatInside === false) {
        state.tags.push(action.payload.tag);
        state.todos[state.todos.indexOf(elem)].tags.push(action.payload.tag);
      }
    },
    deleteTag: (state, action) => {
      let repeat = false;
      const elem = state.todos.find((todo) => todo.id === action.payload.id);
      if (!elem) throw new Error("elem is undefined");

      state.todos[state.todos.indexOf(elem)].tags = state.todos[
        state.todos.indexOf(elem)
      ].tags.filter((tag) => tag.tagId !== action.payload.tagId);

      for (let i = 0; i < state.todos.length; i++) {
        for (let j = 0; j < state.todos[i].tags.length; j++) {
          if (state.todos[i].tags[j].tagTitle === action.payload.tagTitle) {
            repeat = true;
          }
        }
      }

      if (!repeat) {
        state.tags = state.tags.filter(
          (tag) => tag.tagTitle !== action.payload.tagTitle
        );
      }
    },
    filterTag: (state, action) => {
      state.filterTag = action.payload;
    },
    filteredArr: (state, action) => {
      state.filteredArr = action.payload;
    },
  },
});

export const {
  addToDo,
  deleteToDo,
  editToDo,
  addTag,
  deleteTag,
  filterTag,
  filteredArr,
} = todoSlice.actions;

export const todosReducer = todoSlice.reducer;
