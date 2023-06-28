import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { deletePost } from "../app/slices/postSlice";

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

export const DeleteModal = ({
  open,
  handleClose,
  deleteModal,
  createCardModal,
  id,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deletePost({
        id,
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure?
        </Typography>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => handleDelete()}>Ok</Button>
          <Button onClick={() => handleClose()}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
};
