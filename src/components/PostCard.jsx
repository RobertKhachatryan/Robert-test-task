import {
  Button,
  Card,
  CardActions,
  CardContent,
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

export const PostCard = ({ title, body, id, handleOpen }) => {
  // states
  const [inputToggle, setInputTogle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  //   const [modalIsOpen, setModalIsOpen] = useState(false);
  const comments = useSelector((state) => state.comments.getCommentsById.data);
  console.log(comments);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setInputTogle(!inputToggle);
  };

  const getComments = () => {
    dispatch(getCommentsById({ id }));
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

  return (
    <>
      <Card sx={{ width: 300, marginTop: 5 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <IconButton
              component={ModeEditOutlinedIcon}
              color="primary"
              onClick={handleEdit}
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
          </div>
          <div>
            <IconButton
              style={{ fontSize: "35px" }}
              component={DeleteOutlineOutlinedIcon}
              color="error"
              onClick={() => {
                //   handleDelete();
                handleOpen(true);
              }}
            />
          </div>
        </CardActions>
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
      </Card>
    </>
  );
};
