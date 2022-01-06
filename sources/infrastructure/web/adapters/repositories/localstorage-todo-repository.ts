import {TodoInterface} from "../../../../domain/entities/todo-interface";
import {TodoRepositoryInterface} from "../../../../domain/repositories/todo-repository-interface";

export class LocalstorageTodoRepository implements TodoRepositoryInterface {
  private key: string;

  constructor({key}: {key: string}) {
    this.key = key;
  }

  add({todo}: {todo: TodoInterface}): Promise<void> {
    return new Promise((resolve, reject) => {
      const rawTodos = window.localStorage.getItem(this.key) ?? "[]";
      const todos = JSON.parse(rawTodos);

      if (!Array.isArray(todos) || !todos.every(todo => typeof todo === "object" && typeof todo.name === "string")) {
        return reject(new Error("Todos corrupted"));;
      }

      window.localStorage.setItem(this.key, JSON.stringify([...todos, todo]));
      resolve();
    });
  }

  all(): Promise<Array<TodoInterface>> {
    return new Promise((resolve, reject) => {
      const rawTodos = window.localStorage.getItem(this.key) ?? "[]";
      const todos = JSON.parse(rawTodos);

      if (!Array.isArray(todos) || !todos.every(todo => typeof todo === "object" && typeof todo.name === "string")) {
        return reject(new Error("Todos corrupted"));;
      }

      resolve(todos);
    });
  }

  removeAll(): Promise<void> {
    return new Promise((resolve) => {
      window.localStorage.removeItem(this.key);
      resolve();
    });
  }

  remove({todoIdentifier}: {todoIdentifier: string}): Promise<void> {
    return new Promise((resolve, reject) => {
      const rawTodos = window.localStorage.getItem(this.key) ?? "[]";
      const todos = JSON.parse(rawTodos);

      if (!Array.isArray(todos) || !todos.every(todo => typeof todo === "object" && typeof todo.name === "string")) {
        return reject(new Error("Todos corrupted"));;
      }

      const foundTodo = todos.find(todo => todo.identifier === todoIdentifier);

      if (!foundTodo) {
        return reject(new Error("Todo not found"));
      }

      window.localStorage.setItem(this.key, JSON.stringify(todos.filter(todo => todo.identifier !== todoIdentifier)));
      resolve();
    });
  }
}
