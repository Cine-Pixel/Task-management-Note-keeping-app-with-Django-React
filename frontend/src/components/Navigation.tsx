import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateFormModal from "./CreateFormModal";
import logo from "../assets/logo.png";

interface PropTypes {
  fetchTodos: () => void;
}

const Navigation: React.FC<PropTypes> = ({ fetchTodos }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="custom-link" to="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Todo
          </Link>
        </Navbar.Brand>
        <CreateFormModal fetchTodos={fetchTodos} />
      </Container>
    </Navbar>
  );
};

export default Navigation;
