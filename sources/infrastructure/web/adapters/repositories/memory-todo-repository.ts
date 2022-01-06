import {TodoInterface} from "../../../../domain/entities/todo-interface";
import {TodoRepositoryInterface} from "../../../../domain/repositories/todo-repository-interface";

export class MemoryTodoRepository implements TodoRepositoryInterface {
  private todos: Array<TodoInterface>;

  constructor() {
    this.todos = [];
  }

  add({todo}: {todo: TodoInterface}): Promise<void> {
    return new Promise((resolve) => {
      this.todos.push(todo);
      resolve();
    });
  }

  all(): Promise<Array<TodoInterface>> {
    return new Promise((resolve) => {
      resolve(this.todos);
    });
  }

  removeAll(): Promise<void> {
    return new Promise((resolve) => {
      this.todos = [];
      resolve();
    });
  }

  remove({todoIdentifier}: {todoIdentifier: string}): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.todos.findIndex(todo => todo.identifier === todoIdentifier);

      if (index === -1) {
        return reject(new Error("Todo not found"));
      }

      this.todos.splice(index, 1);
      resolve();
    });
  }
}
