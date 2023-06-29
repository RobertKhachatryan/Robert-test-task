import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});

const savedUsers = localStorage.getItem("users");
const initialUsers = savedUsers ? JSON.parse(savedUsers) : null;

const initialState = {
  data: initialUsers,
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
export const usersReducer = userSlice.reducer;
