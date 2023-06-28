import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPhotos } from "../app/slices/photosSlice";

export const PhotosPage = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (albumId != undefined) {
      dispatch(getPhotos({ albumId }));
    }
  }, [albumId]);
  const photos = useSelector((state) => state.photos.getPhotos.data);
  const photosLoading = useSelector((state) => state.photos.getPhotos.loading);

  return (
    <Box display="flex">
      {photosLoading && <Box>Loading</Box>}
      {!photosLoading &&
        photos?.map((photo) => {
          return (
            <Box>
              <img src={photo.thumbnailUrl} />
            </Box>
          );
        })}
    </Box>
  );
};
