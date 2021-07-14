import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getCookie } from "../utils/getCookie";

interface StateType {
  title: string;
  content: string;
  completed: boolean;
}

interface PropTypes {
  fetchTodos: () => void;
}

const CreateForm: React.FC<PropTypes> = ({ fetchTodos }) => {
  const [data, setData] = useState<StateType>({
    title: "",
    content: "",
    completed: false,
  });
  const [error, setError] = useState({
    title: false,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (data.title === "") {
      setError({ ...error, title: true });
      return;
    }

    const csrftoken = getCookie("csrftoken");

    fetch("/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchTodos();
      })
      .catch((err) => setError(err));
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({
      ...data,
      [e.target.id]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        {error.title && (
          <>
            <br />
            <small style={{ color: "red" }}>
              {" "}
              * This field may not be blank
            </small>
          </>
        )}
        <Form.Control
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Content"
          value={data.content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="completed">
        <Form.Check
          type="checkbox"
          label="Completed"
          checked={data.completed}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateForm;
