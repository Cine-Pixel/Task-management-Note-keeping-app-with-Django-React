import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CreateForm from "./CreateForm";

interface PropTypes {
  fetchTodos: () => void;
}

const CreateFormModal: React.FC<PropTypes> = ({ fetchTodos }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm fetchTodos={fetchTodos} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateFormModal;
