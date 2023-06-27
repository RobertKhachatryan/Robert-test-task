import React, { useState } from "react";
import { Switch } from "@mui/material";

export const TodoSwitch = ({ checked }) => {
  console.log(checked);
  //   const [checked, setChecked] = useState(false);

  const handleChange = () => {
    // setChecked(!checked);
  };

  return <Switch checked={checked} onChange={handleChange} color="secondary" />;
};
