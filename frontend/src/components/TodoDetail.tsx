import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Spinner } from "react-bootstrap";
import Note from "./Note";
import { TodoDetailType } from "../types/TodoTypes";
import AddNote from "./AddNote";

const TodoDetail = () => {
  const [todo, setTodo] = useState<TodoDetailType>();
  const [loading, setLoading] = useState(true);
  const { todoId } = useParams<{ todoId: string }>();

  const fetchTodo = () => {
    setLoading(true);
    fetch(`/api/todos/${todoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <Container className="custom-container">
      {!loading && todo ? (
        <>
          <Card className="mt-3">
            <Card.Header as="h5">Todo Details</Card.Header>
            <Card.Body>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>{todo.content}</Card.Text>
              <AddNote refetch={fetchTodo} todoId={todo.id} />
            </Card.Body>
          </Card>

          <Container className="mt-3 notes-container custom-container">
            {todo.notes.map((note) => (
              <Note key={note.id} note={note} refetch={fetchTodo} />
            ))}
          </Container>
        </>
      ) : (
        <Row className="justify-content-center spinner-custom-container">
          <Spinner animation="grow" className="spinner-custom" />
        </Row>
      )}
    </Container>
  );
};

export default TodoDetail;
