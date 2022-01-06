import {AddTodo} from "../../domain/usecases/add-todo";
import {ListTodos} from "../../domain/usecases/list-todos";
import {ClearTodos} from "../../domain/usecases/clear-todos";
import {LocalstorageTodoRepository} from "./adapters/repositories/localstorage-todo-repository";
import {TodosPresenter} from "./adapters/presenters/todos-presenter";
import {Todo} from "./adapters/entities/todo";

const form = document.getElementById("todo");
const clearButton = document.getElementById("clear");

if (!form) {
  throw new Error("Form not found");
}

if (!clearButton) {
  throw new Error("Clear button not found");
}

const todoRepository = new LocalstorageTodoRepository({key: "todos"});
const todosPresenter = new TodosPresenter({todoRepository});

const addTodo = new AddTodo({todosPresenter, todoRepository});
const listTodos = new ListTodos({todosPresenter, todoRepository});
const clearTodos = new ClearTodos({todosPresenter, todoRepository});

form.addEventListener("submit", event => {
  const nameInput = document.getElementById("name");

  if (!(nameInput instanceof HTMLInputElement)) {
    return;
  }

  console.log(nameInput.value);

  const todo = new Todo({
    identifier: new Date().getTime().toString(36),
    name: nameInput.value
  });

  addTodo.execute({todo}).catch(error => {
    console.error(error.message);
  });

  event.preventDefault();

  if (!(event.currentTarget instanceof HTMLFormElement)) {
    return;
  }

  event.currentTarget.reset();
});

clearButton.addEventListener("click", () => {
  clearTodos.execute().catch(error => {
    console.error(error.message);
  });
});

listTodos.execute().catch(error => {
  console.error(error.message);
});
