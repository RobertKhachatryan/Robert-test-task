import React, { useEffect } from "react";
import { Header } from "../layout/header";
import { PageTitle } from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../app/slices/todosSlice";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
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
import AddIcon from "@mui/icons-material/Add";

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
    cursor: pointer;
    :hover {
      background-color: #84c1ff;
      transition: 0.5s;
    }
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={3}
          marginBottom={4}
        >
          <PageTitle title="Задачи" />
          <IconButton
            component={AddIcon}
            style={{ fontSize: "50px", marginLeft: "20px" }}
            color="primary"
          />
        </Box>
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
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          marginTop={"30px"}
          justifyContent={"space-between"}
        >
          <Pagination count={10} variant="outlined" shape="rounded" />
          <Box>
            <Button>В избранное</Button>
            <Button>Удалить</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
