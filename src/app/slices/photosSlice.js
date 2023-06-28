import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  getPhotos: {
    loading: false,
    data: [],
    error: null,
  },
};

export const getPhotos = createAsyncThunk(
  "getPhotosAction",
  async ({ albumId, page, limit }) => {
    const { data } = await axios.get(
      `/photos?albumId=${albumId}&_limit=${limit}&_page=${page}`
    );
    return data;
  }
);
export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, (state) => {
      state.getPhotos.loading = true;
      state.getPhotos.data = [];
      state.getPhotos.error = null;
    });
    builder.addCase(getPhotos.fulfilled, (state, { payload }) => {
      state.getPhotos.loading = false;
      state.getPhotos.data = payload;
      state.getPhotos.error = null;
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.getPhotos.loading = false;
      state.getPhotos.data = [];
      state.getPhotos.error = "Something went wrong!";
    });
  },
});

// export const selectPosts = (state) => state.post.data;
export const photosReducer = photosSlice.reducer;
