import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import { CreateCardModalUsersSelect } from "./CreateCardModalUsersSelect";
import { useState } from "react";

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

export default function CreateCardModal({
  open,
  onCreate,
  handleClose,
  usersData,
}) {
  //states
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const handleCreate = () => {
    onCreate({
      id: new Date().getTime(),
      body,
      title,
      userId: 10,
      userName: selectedUser ? selectedUser : "",
    });

    setTitle("");
    setBody("");
  };

  const selectUserCB = (user) => {
    setSelectedUser(user);
  };

  React.useEffect(() => {
    if (usersData) {
      const usersMap = usersData.map((user) => {
        return {
          label: user.username,
          value: user.id,
        };
      });
      setUserOptions(usersMap);
    }
  }, [usersData]);

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
          <CreateCardModalUsersSelect
            options={userOptions}
            selectUser={selectUserCB}
          />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          marginTop={3}
        >
          <Button onClick={() => handleCreate()}>Create</Button>
          <Button onClick={() => handleClose()}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
