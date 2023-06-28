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

export const CustomPagination = ({ page, albumId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const pageCount = searchParams.get("page");
  const limit = searchParams.get("limit");
  const paginationCount = searchParams.get("count");

  const [count, setCount] = useState(paginationCount || 0);
  useEffect(() => {
    switch (page) {
      case "posts":
        dispatch(getPosts({ page: pageCount || 1, limit: limit || 10 }));
        break;
      case "albums":
        dispatch(fetchAlbums({ page: pageCount || 1, limit: limit || 10 }));
        break;

      case "photos":
        dispatch(
          getPhotos({ albumId, page: pageCount || 1, limit: limit || 10 })
        );
        break;
      case "todos":
        dispatch(fetchTodos({ page: pageCount || 1, limit: limit || 10 }));
        break;
    }
  }, [location]);

  const changePage = (p) => {
    location.search = `?page=${p}&limit=${limit || 10}&count=${p}`;
    navigate(location);
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
          onChange={(e, p) => {
            changePage(p);
          }}
          count={10}
          variant="outlined"
          shape="rounded"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={count}
            label="Element Count"
            onChange={(e) => {
              setCount(e.target.value);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>50</MenuItem>
            <MenuItem value={30}>100</MenuItem>
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
