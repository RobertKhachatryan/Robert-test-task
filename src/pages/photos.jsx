import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPhotos } from "../app/slices/photosSlice";
import { ProgressBar } from "react-loader-spinner";
import { Header } from "../layout/header";

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
    <>
      <Header />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        marginTop="100px"
        padding="0px 100px"
      >
        {photosLoading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        )}
        {!photosLoading &&
          photos?.map((photo) => {
            return (
              <Box width="100%">
                <img src={photo.thumbnailUrl} />
              </Box>
            );
          })}
      </Box>
    </>
  );
};
