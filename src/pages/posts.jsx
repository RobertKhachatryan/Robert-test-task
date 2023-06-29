import React, { useEffect, useState } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useSelector } from "react-redux";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { PostCard } from "../components/PostCard";
import { DeleteModal } from "../components/DeleteModal";
import CreateCardModal from "../components/CreateCardModal";
import AddIcon from "@mui/icons-material/Add";
import { CustomPagination } from "../components/CustomPagination";
import axios from "../axios";

export const PostsPage = () => {
  //states
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const comments = useSelector((state) => state.comments.getCommentsById.data);
  const [postId, setPostId] = useState();
  const loadData = async ({ page, limit }) => {
    const { data } = await axios.get(`/posts?_page=${page}&_limit=${limit}`);
    const usersData = await axios.get(`/users`);
    setUsersData(usersData.data);
    setPosts(data);
  };

  const onCreate = (post) => {
    setPosts(posts.concat(post));
    setOpenCreateModal(false);
  };
  const onEdit = (newPost) => {
    setData(
      posts.map((post) => {
        if (post.id === postId) return newPost;
        return post;
      })
    );
  };
  const onDelete = (postId) => {
    setPosts(posts.filter((item) => item.id !== postId));
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    loadData({ page: 1, limit: 10 });
  }, []);

  const getUser = (id) => {
    if (!usersData) {
      return;
    }
    return usersData.find((item) => item.id === id);
  };

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
        <PageTitle title="Посты" />
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
        {posts?.map((item) => (
          <PostCard
            setCommentVisible={setCommentVisible}
            commentVisible={commentVisible}
            id={item.id}
            key={item.id * Math.random()}
            title={item.title}
            body={item.body}
            user={item?.userName || getUser(item.userId).username}
            handleOpen={() => {
              setOpenDeleteModal(true);
              setPostId(item.id);
            }}
          />
        ))}
        <Box position={"absolute"}>
          {commentVisible &&
            comments?.map((comment) => {
              return (
                <Box
                  key={comment.id}
                  border={"1px solid #c5e9ff"}
                  backgroundColor={"#daf1ff"}
                  borderRadius={2}
                  padding={1}
                >
                  <Typography>Name: {comment?.name}</Typography>
                  <Typography>Email: {comment?.email}</Typography>
                  <Typography>{comment?.body}</Typography>
                </Box>
              );
            })}
        </Box>
        <DeleteModal
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          onDelete={onDelete}
          id={postId}
        />

        <CreateCardModal
          usersData={usersData}
          open={openCreateModal}
          onCreate={onCreate}
          handleClose={() => setOpenCreateModal(false)}
        />
        <CustomPagination loadData={loadData} />
      </Grid>
    </>
  );
};
