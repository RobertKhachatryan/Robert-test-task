import React from "react";
import { Box, Typography } from "@mui/material";

export const PageTitle = ({ title }) => {
  return (
    <Box>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
    </Box>
  );
};
