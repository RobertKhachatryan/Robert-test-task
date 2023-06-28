import React, { useEffect } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../app/slices/albumsSlice";
import { Box, ListItem, Pagination, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
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
                  <p>Name: </p>
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
                    // onClick={() => {
                    //   //   handleDelete();
                    //   handleOpen(true);
                    // }}
                  />
                  <Checkbox />
                </div>
              </StyledListItem>
            );
          })}
        </Stack>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          style={{ marginTop: "30px" }}
        />
      </Box>
    </>
  );
};
