import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import InputGroup from "react-bootstrap/InputGroup";

import FormControl from "react-bootstrap/FormControl";

import ListGroup from "react-bootstrap/ListGroup";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface TodoItem {
  id: number;

  task: string;

  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: TodoItem = {
        id: Math.random(),

        task: newTodo,

        completed: false,
      };

      setTodos([...todos, newTodoItem]);

      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, newTask: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: newTask };
        }

        return todo;
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />

            <Button variant="dark" onClick={handleAddTodo}>
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {todos.map((todo, index) => (
              <ListGroup.Item key={index} variant="dark">
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>

                <Button
                  variant="success"
                  onClick={() => {
                    const newTask = prompt("Edit todo:", todo.task);

                    if (newTask !== null) {
                      handleEditTodo(todo.id, newTask);
                    }
                  }}
                >
                  <FaEdit />
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
