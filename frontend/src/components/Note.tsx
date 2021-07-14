import { Button, Card } from "react-bootstrap";
import { NoteType } from "../types/NoteTypes";
import { getCookie } from "../utils/getCookie";

interface PropTypes {
  note: NoteType;
  refetch: () => void;
}

const Note: React.FC<PropTypes> = ({ note, refetch }) => {
  const handleDelete = () => {
    const csrftoken = getCookie("csrftoken");

    fetch(`/api/notes/delete/${note.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
      },
    }).then((data) => {
      console.log(data);
      refetch();
    });
  };

  return (
    <Card
      key={note.id}
      bg="primary"
      text="white"
      style={{ width: "18rem" }}
      className="mb-2"
    >
      <Card.Body>
        <Card.Title>{note.content}</Card.Title>
      </Card.Body>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Card>
  );
};

export default Note;
