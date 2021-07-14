import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getCookie } from "../utils/getCookie";

interface PropTypes {
  refetch: () => void;
  todoId: number;
}

const AddNote: React.FC<PropTypes> = ({ refetch, todoId }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    content: "",
  });
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (data.content === "") {
      setError(true);
      return;
    }

    const csrftoken = getCookie("csrftoken");

    fetch(`/api/todos/${todoId}/notes/`, {
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
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              {error && (
                <>
                  <br />
                  <small style={{ color: "red" }}>
                    {" "}
                    * This field may not be blank
                  </small>
                </>
              )}
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Content"
                value={data.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNote;
