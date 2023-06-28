import React, { useEffect, useState } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../app/slices/postSlice";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { PostCard } from "../components/PostCard";
import { DeleteModal } from "../components/DeleteModal";
import CreateCardModal from "../components/CreateCardModal";
import AddIcon from "@mui/icons-material/Add";
import { CustomPagination } from "../components/CustomPagination";

export const PostsPage = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts.getPosts.data);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const comments = useSelector((state) => state.comments.getCommentsById.data);
  const [postId, setPostId] = useState();
  console.log(comments);
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
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={3}
        marginBottom={4}
      >
        <PageTitle title="Posts" />
        <IconButton
          component={AddIcon}
          onClick={() => setOpenCreateModal(true)}
          style={{ fontSize: "50px", marginLeft: "20px" }}
          color="primary"
        />
      </Box>
      <Grid padding={"0px 100px"}></Grid>

      <Grid
        justifyContent={"flex-start"}
        padding={"0px 100px"}
        gap={3}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {postsData?.map((item) => (
          <PostCard
            setCommentVisible={setCommentVisible}
            commentVisible={commentVisible}
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
        {commentVisible &&
          comments?.map((comment) => {
            console.log(comment);
            return (
              <Box key={comment.id}>
                <Typography>{comment?.name}</Typography>
                <Typography>{comment?.email}</Typography>
                <Typography>{comment?.body}</Typography>
              </Box>
            );
          })}
        <DeleteModal
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          id={postId}
        />
        <CreateCardModal
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
        />
        <CustomPagination page="posts" />
      </Grid>
    </>
  );
};
