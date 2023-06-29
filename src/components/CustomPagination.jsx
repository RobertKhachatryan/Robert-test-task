import React, { useState } from "react";
import {
  Pagination,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export const CustomPagination = ({ loadData }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const changePage = (pageNumber) => {
    setPage(pageNumber);

    loadData({
      limit: limit,
      page: pageNumber,
    });
  };

  const changePageSize = (e) => {
    const newLimit = e.target.value;

    setLimit(newLimit);
    loadData({
      page,
      limit: newLimit,
    });
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      marginTop={"30px"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems="center">
        <Pagination
          onChange={(e, pageNumber) => changePage(pageNumber)}
          count={10}
          variant="outlined"
          shape="rounded"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Count</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Element Count"
            onChange={changePageSize}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={100}>All</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button>В избранное</Button>
        <Button>Удалить</Button>
      </Box>
    </Box>
  );
};
