import React, { useState } from "react";
import { Switch } from "@mui/material";

export const TodoSwitch = ({ checked }) => {
  const handleChange = () => {};

  return <Switch checked={checked} onChange={handleChange} color="secondary" />;
};
