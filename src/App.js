import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// PAGES
import { PostsPage } from "./pages/posts";
import { AlbumsPage } from "./pages/albums";
import { TodosPage } from "./pages/todos";
import { PhotosPage } from "./pages/photos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        {/* <Route path="/" element={<div>aaaa</div>} /> */}
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="photos/:albumId" element={<PhotosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
