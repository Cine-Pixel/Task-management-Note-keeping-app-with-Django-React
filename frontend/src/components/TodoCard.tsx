import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TodoType } from "../types/TodoTypes";
import { getCookie } from "../utils/getCookie";

interface PropTypes {
  todo: TodoType;
  fetchTodos: () => void;
}

const TodoCard: React.FC<PropTypes> = ({ todo, fetchTodos }) => {
  const handleClick = () => {
    const csrftoken = getCookie("csrftoken");

    fetch(`/api/todos/delete/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
      },
    })
      .then((data) => {
        console.log(data);
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };

  const handleComplete = () => {
    const csrftoken = getCookie("csrftoken");

    fetch(`/api/todos/update/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    })
      .then((data) => {
        console.log(data);
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Subtitle>
          Status: {todo.completed ? "Completed" : "Not Completed yet"}
        </Card.Subtitle>
        <Card.Text>{todo.content}</Card.Text>
        <Button variant="primary mr-3">
          <Link to={`/todo-detail/${todo.id}`} className="custom-link">
            Detail
          </Link>
        </Button>
        <Button variant="danger mr-3" onClick={handleClick}>
          Delete
        </Button>
        <Button
          variant={todo.completed ? "warning" : "success"}
          onClick={handleComplete}
        >
          {todo.completed ? "Uncomplete" : "Complete"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;
