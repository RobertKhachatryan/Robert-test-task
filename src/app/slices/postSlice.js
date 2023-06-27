import axios from "../../axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const savedCards = localStorage.getItem("posts");
const initialCards = savedCards ? JSON.parse(savedCards) : null;

const initialState = {
  //   data: initialCards,
  getPosts: {
    loading: false,
    data: initialCards,
    error: null,
  },
  editPost: {
    loading: false,
    error: null,
  },
  deletePost: {
    loading: false,
    error: null,
  },
  createPost: {
    loading: false,
    error: null,
  },
};

export const getPosts = createAsyncThunk(
  "getPostsAction",
  async ({ page, limit }) => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts || !posts.length) {
      const { data } = await axios.get(`/posts?_page=${page}&_limit=${limit}`);
      localStorage.setItem("posts", JSON.stringify(data));
      return data;
    }
    return posts;
  }
);
export const editPost = createAsyncThunk(
  "editPostAction",
  async ({ id, payload }, { getState }) => {
    const state = getState();
    const savedCards = state.posts.getState.data;
    const index = savedCards.findIndex((item) => item.id === id);
    if (index !== -1) {
      savedCards[index].body = payload.body;
      savedCards[index].title = payload.title;
      savedCards[index].userId = payload.userId;
      localStorage.setItem("posts", JSON.stringify(savedCards));
    }
    return savedCards;
  }
);
export const deletePost = createAsyncThunk(
  "deletePostAction",
  async ({ id, onSuccess }, { getState }) => {
    const state = getState();
    const newData = state.posts.getPosts.data.filter((item) => item.id !== id);
    localStorage.setItem("posts", JSON.stringify(newData));
    if (onSuccess) {
      onSuccess();
    }
    return newData;
  }
);

export const createPost = createAsyncThunk(
  "createPostAction",
  async ({ payload, onSuccess }, { getState }) => {
    try {
      const state = getState();
      const data = [...state.posts.getPosts.data, payload];

      if (onSuccess) {
        onSuccess();
      }
      localStorage.setItem("posts", JSON.stringify(data));
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.getPosts.loading = true;
      state.getPosts.data = [];
      state.getPosts.error = null;
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.getPosts.loading = false;
      state.getPosts.data = payload;
      state.getPosts.error = null;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.getPosts.loading = false;
      state.getPosts.data = [];
      state.getPosts.error = "Something went wrong!";
    });
    /////////////
    builder.addCase(editPost.pending, (state) => {
      state.editPost.loading = true;
      state.editPost.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.editPost.loading = false;
      state.getPosts.data = payload;
      state.editPost.error = null;
    });
    builder.addCase(editPost.rejected, (state) => {
      state.editPost.loading = false;
      state.editPost.error = "Something went wrong!";
    });
    ////////////////////////
    builder.addCase(deletePost.pending, (state) => {
      state.deletePost.loading = true;
      state.deletePost.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.deletePost.loading = false;
      state.getPosts.data = payload;
      state.deletePost.error = null;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.deletePost.loading = false;
      state.deletePost.error = "Something went wrong!";
    });
    /////////////////////////////////
    builder.addCase(createPost.pending, (state) => {
      state.createPost.loading = true;
      state.createPost.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.createPost.loading = false;
      state.getPosts.data = payload;
      state.createPost.error = null;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createPost.loading = false;
      state.createPost.error = "Something went wrong!";
    });
  },
});

// export const selectPosts = (state) => state.post.data;
export const postsReducer = postSlice.reducer;
