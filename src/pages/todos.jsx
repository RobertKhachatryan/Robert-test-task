import React, { useEffect } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../app/slices/todosSlice";
import Stack from "@mui/material/Stack";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { TodoSwitch } from "../components/todoSwitch";
//icons
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const TodosPage = () => {
  const dispatch = useDispatch();
  const todosData = useSelector((state) => state.todos.data);

  const getTodos = async () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos || !todos.length) {
      const data = await dispatch(
        fetchTodos({
          page: 1,
          limit: 10,
        })
      );
      if (!data.payload) {
        return;
      }
      window.localStorage.setItem("todos", JSON.stringify(data.payload));
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  const StyledListItem = styled(ListItem)`
    width: 100%;
    display: flex;
    justify-content: space-between !important;
    background-color: #bfdfff;
    border-radius: 10px;
  `;

  const sortedTodos = [...todosData].sort((a, b) => {
    if (!a.completed && b.completed) {
      return -1;
    } else if (a.completed && !b.completed) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <Header />
      <Box padding={"0px 100px"}>
        <PageTitle title="Todos" />
        <Stack spacing={1}>
          {sortedTodos?.map((task) => {
            const status = task?.completed ? "Completed" : "Uncompleted";
            return (
              <StyledListItem
                key={task?.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  variant="h6"
                  style={
                    task?.completed ? { textDecoration: "line-through" } : null
                  }
                >
                  {task?.title}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    component={ModeEditOutlinedIcon}
                    color="primary"
                    // onClick={handleEdit}
                    style={{ fontSize: "35px" }}
                  />

                  <Typography variant="h6">{status}</Typography>
                  <TodoSwitch checked={task?.completed} />
                  <Checkbox />
                </div>
              </StyledListItem>
            );
          })}
        </Stack>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          style={{ marginTop: "50px" }}
        />
      </Box>
    </>
  );
};
