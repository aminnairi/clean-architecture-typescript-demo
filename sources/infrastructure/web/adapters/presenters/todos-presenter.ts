import {TodosPresenterInterface} from "../../../../domain/presenters/todos-presenter-interface";
import {TodoInterface} from "../../../../domain/entities/todo-interface";
import {RemoveTodo} from "../../../../domain/usecases/remove-todo";
import {TodoRepositoryInterface} from "../../../../domain/repositories/todo-repository-interface";

export class TodosPresenter implements TodosPresenterInterface {
  private todoRepository: TodoRepositoryInterface;

  constructor({todoRepository}: {todoRepository: TodoRepositoryInterface}) {
    this.todoRepository = todoRepository;
  }

  public present({todos}: {todos: Array<TodoInterface>, removeTodo: RemoveTodo}): Promise<void> {
    return new Promise((resolve, reject) => {
      const todosContainer = document.getElementById("todos");

      if (!todosContainer) {
        return reject(new Error("Todos container not found"));
      }

      todosContainer.innerHTML = "";

      todos.forEach(todo => {
        const todoItem = document.createElement("li");
        const todoItemText = document.createTextNode(todo.name);
        const todoItemRemoveButton = document.createElement("button");

        todoItemRemoveButton.innerText = "Remove";
        todoItemRemoveButton.style.marginLeft = "10px";

        todoItemRemoveButton.addEventListener("click", () => {
          new RemoveTodo({todoRepository: this.todoRepository, todosPresenter: this}).execute({todoIdentifier: todo.identifier}).catch(error => {
            console.error(error.message);
          });
        });

        todoItem.appendChild(todoItemText);
        todoItem.appendChild(todoItemRemoveButton);

        todosContainer.appendChild(todoItem);
      });

      resolve();
    });
  }
}
