import React, { useEffect, useState } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../app/slices/albumsSlice";
import {
  Box,
  Button,
  ListItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import { DeleteModal } from "../components/DeleteModal";
//icons
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import StarIcon from "@mui/icons-material/Star";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export const AlbumsPage = () => {
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [postId, setPostId] = useState();

  const albumsData = useSelector((state) => state.albums.data);
  const getAlbums = async () => {
    const albums = JSON.parse(localStorage.getItem("albums"));
    console.log(albums, "sssss");
    if (!albums || !albums.length) {
      const data = await dispatch(
        fetchAlbums({
          page: 1,
          limit: 10,
        })
      );
      if (!data.payload) {
        return;
      }
      window.localStorage.setItem("albums", JSON.stringify(data.payload));
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);
  const StyledListItem = styled(ListItem)`
    width: 100%;
    display: flex;
    justify-content: space-between !important;
    background-color: #bfdfff;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: #84c1ff;
      transition: 0.5s;
    }
  `;
  return (
    <>
      <Header />
      <PageTitle title="Albums" />
      <Box padding={"0px 100px"}>
        <Stack spacing={1}>
          {albumsData?.map((album) => {
            return (
              <StyledListItem key={album?.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography>Name: </Typography>
                  <Typography variant="h6">{album?.title}</Typography>
                </div>
                <div>
                  <IconButton
                    component={ModeEditOutlinedIcon}
                    color="primary"
                    // onClick={handleEdit}
                    style={{ fontSize: "35px" }}
                  />

                  <IconButton
                    style={{ fontSize: "35px" }}
                    component={FavoriteBorderOutlinedIcon}
                    color="primary"
                  />

                  <IconButton
                    style={{ fontSize: "35px" }}
                    component={DeleteOutlineOutlinedIcon}
                    color="error"
                    onClick={() => {
                      //   handleDelete();
                      setOpenDeleteModal(true);
                    }}
                  />
                  <Checkbox />
                </div>
              </StyledListItem>
            );
          })}
        </Stack>
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          marginTop={"30px"}
          justifyContent={"space-between"}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
          <Box>
            <Button>В избранное</Button>
            <Button>Удалить</Button>
          </Box>
        </Box>
      </Box>
      <DeleteModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        id={postId}
      />
    </>
  );
};
