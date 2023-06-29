import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const CreateCardModalUsersSelect = ({ options, selectUser }) => {
  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="User"
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => selectUser(option.label)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
