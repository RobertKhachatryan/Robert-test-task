import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  getCommentsById: {
    data: null,
    loading: false,
    error: null,
  },
};

export const getCommentsById = createAsyncThunk(
  "getCommentsAction",
  async ({ id }) => {
    const { data } = await axios.get(`/comments?postId=${id}`);
    return data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsById.pending, (state) => {
      state.getCommentsById.loading = true;
      state.getCommentsById.data = null;
      state.getCommentsById.error = null;
    });
    builder.addCase(getCommentsById.fulfilled, (state, { payload }) => {
      state.getCommentsById.loading = false;
      state.getCommentsById.data = payload;
      state.getCommentsById.error = null;
    });
    builder.addCase(getCommentsById.rejected, (state) => {
      state.getCommentsById.loading = false;
      state.getCommentsById.data = null;
      state.getCommentsById.error = "Something went wrong!";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
