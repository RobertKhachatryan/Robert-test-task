import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (params) => {
    const { data } = await axios.get(
      "/users"
      // params
    );
    return data;
  }
);

const savedUsers = localStorage.getItem("users");
const initialUsers = savedUsers ? JSON.parse(savedUsers) : null;

const initialState = {
  data: initialUsers,
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // editPost: (state, action) => {},
    // deleteItem: (state, action) => {},
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectUsers = (state) => state.user.data;
// export const { editPost, deleteItem } = postSlice.actions;
export const usersReducer = userSlice.reducer;
