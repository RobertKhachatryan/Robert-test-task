import React, { useEffect, useState } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../app/slices/postSlice";
import { Button, Grid, Pagination } from "@mui/material";
import { PostCard } from "../components/PostCard";
import CustomModal from "../components/modal";
import CreateCardModal from "../components/CreateCardModal";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts.getPosts.data);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [postId, setPostId] = useState();
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (!posts || !posts.length) {
      dispatch(
        getPosts({
          page: 1,
          limit: 10,
        })
      );
    }
  }, []);

  return (
    <>
      <Header />
      <PageTitle title="Posts" />
      <Button onClick={() => setOpenCreateModal(true)}>+</Button>
      <Grid
        justifyContent={"flex-start"}
        padding={"0px 100px"}
        gap={3}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {postsData?.map((item, index) => (
          <PostCard
            id={item.id}
            key={item.id * Math.random()}
            title={item.title}
            body={item.body}
            handleOpen={() => {
              setOpenDeleteModal(true);
              setPostId(item.id);
            }}
          />
        ))}
        <CustomModal
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          deleteModal
          id={postId}
        />
        <CreateCardModal
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
        />
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          style={{ marginTop: "30px" }}
        />
      </Grid>
    </>
  );
};
