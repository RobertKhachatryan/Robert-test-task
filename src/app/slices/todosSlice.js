import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (params) => {
    const { data } = await axios.get(
      `/todos?_page=${params.page}&_limit=${params.limit}`,
      params
    );
    return data;
  }
);

const savedTodos = localStorage.getItem("todos");
const initialTodos = savedTodos ? JSON.parse(savedTodos) : null;

const initialState = {
  data: initialTodos,
  status: "loading",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  // reducers: {
  //   editPost: (state, action) => {
  //     const savedCards = JSON.parse(localStorage.getItem("posts"));
  //     const { id, value } = action.payload;
  //     const index = savedCards.findIndex((item) => item.id === id);
  //     if (index !== -1) {
  //       savedCards[index].body = value;
  //       window.localStorage.setItem("posts", JSON.stringify(savedCards));
  //       state.data[index].body = savedCards[index].body;
  //     }
  //   },
  //   deleteItem: (state, action) => {
  //     const { id } = action.payload;
  //     const newData = state.data.filter((item) => item.id !== id);
  //     window.localStorage.setItem("posts", JSON.stringify(newData));
  //     state.data = newData;
  //   },
  // },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchTodos.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectTodos = (state) => state.todo.data;
// export const { editPost, deleteItem } = postSlice.actions;
export const todosReducer = todoSlice.reducer;
