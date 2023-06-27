import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (params) => {
    const { data } = await axios.get(
      `/albums?_page=${params.page}&_limit=${params.limit}`,
      params
    );
    return data;
  }
);

const savedAlbums = localStorage.getItem("albums");
const initialAlbums = savedAlbums ? JSON.parse(savedAlbums) : null;

const initialState = {
  data: initialAlbums,
  status: "loading",
};
const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
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
      [fetchAlbums.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fetchAlbums.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fetchAlbums.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },
    },
  },
});

export const selectAlbums = (state) => state.album.data;
// export const { editPost, deleteItem } = postSlice.actions;
export const albumsReducer = albumsSlice.reducer;
