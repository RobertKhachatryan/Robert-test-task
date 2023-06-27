import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// PAGES
import { PostsPage } from "./pages/posts";
import { PhotosPage } from "./pages/photos";
import { TodosPage } from "./pages/todos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        {/* <Route path="/" element={<div>aaaa</div>} /> */}
        <Route path="photos" element={<PhotosPage />} />
        <Route path="todos" element={<TodosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
