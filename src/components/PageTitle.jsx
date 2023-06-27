import React from "react";
import { Typography } from "@mui/material";

export const PageTitle = ({ title }) => {
  return (
    <Typography variant="h4" align="center" marginTop={5}>
      {title}
    </Typography>
  );
};
