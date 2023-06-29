import {
  Pagination,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getPosts } from "../app/slices/postSlice";
import { getPhotos } from "../app/slices/photosSlice";
import { fetchAlbums } from "../app/slices/albumsSlice";
import { fetchTodos } from "../app/slices/todosSlice";

export const CustomPagination = ({ loadData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  // const pageCount = searchParams.get("page");
  // const limit = searchParams.get("limit");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const paginationCount = searchParams.get("count");

  const [count, setCount] = useState(paginationCount || 0);
  // useEffect(() => {
  //   switch (page) {
  //     case "albums":
  //       dispatch(fetchAlbums({ page: pageCount || 1, limit: limit || 10 }));
  //       break;

  //     case "photos":
  //       dispatch(
  //         getPhotos({ albumId, page: pageCount || 1, limit: limit || 10 })
  //       );
  //       break;
  //     case "todos":
  //       dispatch(fetchTodos({ page: pageCount || 1, limit: limit || 10 }));
  //       break;
  //   }
  // }, [location]);

  const changePage = (pageNumber) => {
    setPage(pageNumber);

    loadData({
      limit: limit,
      page: pageNumber,
    });

    // location.search = `?page=${pageNumber}&limit=${limit}&count=${p}`;
    // navigate(location);
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
