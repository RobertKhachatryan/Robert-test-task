import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

// icons

import { IconButton } from "@mui/material";
import { getCommentsById } from "../app/slices/commentsSlice";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import styled from "styled-components";
import EditCardModal from "./EditCardModal";

export const PostCard = ({
  title,
  body,
  user,
  id,
  handleOpen,
  setCommentVisible,
  commentVisible,
}) => {
  // states
  const [inputValue, setInputValue] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [postId, setPostId] = useState();

  const dispatch = useDispatch();

  const getComments = () => {
    setCommentVisible(!commentVisible);
    dispatch(
      getCommentsById({
        id,
      })
    );
  };

  const handleSave = () => {
    if (!inputValue) {
      return;
    }
  };

  const StyledCard = styled(Card)`
    width: 300px !important;
    .MuiCardContent-root {
      padding: 5px 15px;
    }
  `;

  return (
    <>
      <StyledCard>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            {" "}
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {user}
            </Typography>
          </Box>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <IconButton
                component={ModeEditOutlinedIcon}
                color="primary"
                onClick={() => setOpenEditModal()}
                style={{ fontSize: "35px" }}
              />
              <IconButton
                onClick={() => getComments()}
                style={{ fontSize: "35px" }}
                component={ModeCommentOutlinedIcon}
                color="primary"
              />

              <IconButton
                style={{ fontSize: "35px" }}
                component={FavoriteBorderOutlinedIcon}
                color="primary"
              />
            </Box>

            <Box>
              <IconButton
                style={{ fontSize: "35px" }}
                component={DeleteOutlineOutlinedIcon}
                color="error"
                onClick={() => {
                  handleOpen(true);
                }}
              />
              <Checkbox />
            </Box>
          </CardActions>
        </CardContent>
        <EditCardModal
          id={postId}
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
        />
      </StyledCard>
    </>
  );
};
