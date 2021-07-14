import TodoCard from "./TodoCard";
import { Container } from "react-bootstrap";
import { TodoType } from "../types/TodoTypes";

interface PropTypes {
  todos: TodoType[];
  fetchTodos: () => void;
}

const TodoList: React.FC<PropTypes> = ({ todos, fetchTodos }) => {
  return (
    <Container fluid className="todos-container custom-container mt-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </Container>
  );
};

export default TodoList;
