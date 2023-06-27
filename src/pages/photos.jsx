import React, { useEffect } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../app/slices/albumsSlice";
import { Box, ListItem, Pagination, Stack, Typography } from "@mui/material";
import styled from "styled-components";

export const PhotosPage = () => {
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
    background-color: #1976d2;
    opacity: 0.8;
    border-radius: 10px;
  `;
  return (
    <>
      <Header />
      <PageTitle title="Albums" />
      <Box padding={"0px 100px"}>
        <Stack spacing={1}>
          {albumsData?.map((album) => {
            return (
              <StyledListItem key={album?.id * Math.random()}>
                <Typography variant="h6">{album?.title}</Typography>
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
