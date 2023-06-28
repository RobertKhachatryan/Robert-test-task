import React from "react";
import { Typography } from "@mui/material";

export const PageTitle = ({ title }) => {
  return (
    <Typography variant="h4" align="center">
      {title}
    </Typography>
  );
};
