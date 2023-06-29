import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import { CreateCardModalUsersSelect } from "./CreateCardModalUsersSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #797979",
  boxShadow: 25,
  p: 3,
};

export default function EditCardModal({ open, onEdit, handleClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <CreateCardModalUsersSelect />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          marginTop={3}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
