import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { createPost, deletePost } from "../app/slices/postSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 25,
  p: 3,
};

export default function CreateCardModal({ open, handleClose }) {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(
      createPost({
        payload: {
          body: "my body",
          title: "srapion",
          userId: 19,
        },
        onSuccess: () => {
          handleClose();
        },
      })
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => handleCreate()}>Create</Button>
          <Button onClick={() => handleClose()}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
}
