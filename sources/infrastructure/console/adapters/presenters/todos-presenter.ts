import {TodosPresenterInterface} from "../../../../domain/presenters/todos-presenter-interface";
import {TodoInterface} from "../../../../domain/entities/todo-interface";

export class TodosPresenter implements TodosPresenterInterface {
  present({todos}: {todos: Array<TodoInterface>}): Promise<void> {
    return new Promise((resolve) => {
      if (todos.length === 0) {
        console.log("No todos to display.");
      } else {
        todos.forEach(todo => {
          console.log(`#${todo.identifier}: ${todo.name}`);
        });

        console.log("");
      }

      resolve();
    });
  }
}
