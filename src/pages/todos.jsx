import React, { useEffect } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../app/slices/todosSlice";
import Stack from "@mui/material/Stack";
import { Box, ListItem, Pagination, Typography } from "@mui/material";
import styled from "styled-components";
import { TodoSwitch } from "../components/todoSwitch";

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
    background-color: #1976d2;
    opacity: 0.8;
    border-radius: 10px;
  `;

  const sortedTodos = [...todosData].sort((a, b) => {
    if (a.completed && !b.completed) {
      return -1;
    } else if (!a.completed && b.completed) {
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
                <Typography variant="h6">{task?.title}</Typography>
                <div style={{ display: "flex" }}>
                  <Typography variant="h6">{status}</Typography>
                  <TodoSwitch checked={task?.completed} />
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
