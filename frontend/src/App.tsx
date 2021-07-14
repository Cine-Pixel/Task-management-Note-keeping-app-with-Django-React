import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Spinner } from "react-bootstrap";
import Navigation from "./components/Navigation";
import TodoList from "./components/TodoList";
import { TodoType } from "./types/TodoTypes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoDetail from "./components/TodoDetail";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = () => {
    setLoading(true);

    fetch("/api/todos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Router>
        <Navigation fetchTodos={fetchTodos} />
        <Switch>
          <Route exact path="/todo-detail/:todoId" component={TodoDetail} />
          <Route exact path="/">
            <Container className="custom-container">
              {loading ? (
                <Row className="justify-content-center spinner-custom-container">
                  <Spinner animation="grow" className="spinner-custom" />
                </Row>
              ) : (
                <TodoList todos={todos} fetchTodos={fetchTodos} />
              )}
            </Container>
          </Route>
          <Route>
            <p>404 NOT FOUND</p>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
