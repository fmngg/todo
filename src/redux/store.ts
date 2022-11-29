import { configureStore } from "@reduxjs/toolkit";

import { todosReducer } from "./slices/ToDos";

const store = configureStore({
  reducer: { todos: todosReducer },
});

export type Rootstate = ReturnType<typeof store.getState>;

export default store;
