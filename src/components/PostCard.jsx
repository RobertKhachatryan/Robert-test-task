import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../app/slices/postSlice";

// icons

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import StarIcon from "@mui/icons-material/Star";
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
  id,
  handleOpen,
  setCommentVisible,
  commentVisible,
}) => {
  // states
  const [inputToggle, setInputTogle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [postId, setPostId] = useState();
  //   const [modalIsOpen, setModalIsOpen] = useState(false);
  const comments = useSelector((state) => state.comments.getCommentsById.data);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setInputTogle(!inputToggle);
  };

  const getComments = () => {
    setCommentVisible(!commentVisible);
    dispatch(
      getCommentsById({
        id,
      })
    );
    console.log(id);
  };

  const handleSave = () => {
    if (!inputValue) {
      return;
    }
    dispatch(
      editPost({
        id: id,
        payload: {
          body: inputValue,
          //   userId
          // title
        },
      })
    );
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
        {inputToggle && (
          <>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
            />
            <button onClick={handleSave}>Save</button>
          </>
        )}
      </StyledCard>
    </>
  );
};
