import { configureStore } from "@reduxjs/toolkit";
import { albumsReducer } from "./slices/albumsSlice";
import { todosReducer } from "./slices/todosSlice";
import { usersReducer } from "./slices/usersSlice";
import { commentsReducer } from "./slices/commentsSlice";
import { photosReducer } from "./slices/photosSlice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    todos: todosReducer,
    users: usersReducer,
    comments: commentsReducer,
    photos: photosReducer,
  },
});
