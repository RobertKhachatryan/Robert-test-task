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
export const todosReducer = todoSlice.reducer;
