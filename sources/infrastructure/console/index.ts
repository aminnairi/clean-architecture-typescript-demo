import {createInterface} from "readline";
import {stdin as input, stdout as output} from "process";
import {ListTodos} from "../../domain/usecases/list-todos";
import {AddTodo} from "../../domain/usecases/add-todo";
import {RemoveTodo} from "../../domain/usecases/remove-todo";
import {ClearTodos} from "../../domain/usecases/clear-todos";
import {TodosPresenter} from "./adapters/presenters/todos-presenter";
import {Todo} from "./adapters/entities/todo";
import {MemoryTodoRepository} from "./adapters/repositories/memory-todo-repository";

const readlineInterface = createInterface({
  input,
  output
});

const todoRepository = new MemoryTodoRepository();
const todosPresenter = new TodosPresenter();

function main(): void {
  readlineInterface.question("Menu: \n1. List todos\n2. Add todo\n3. Remove todo\n4. Clear all todos\n5. Quit\n\nChoice: ", answer => {
    if (answer === "1") {
      console.clear();

      new ListTodos({todoRepository, todosPresenter}).execute().then(() => {
        main();
      }).catch(error => {
        console.clear();
        console.error(error.message);
        main();
      });
    } else if (answer === "2") {
      console.clear();

      readlineInterface.question("Name: ", name => {
        const todo = new Todo({
          identifier: new Date().getTime().toString(36),
          name
        });

        new AddTodo({todoRepository, todosPresenter}).execute({todo}).then(() => {
          console.clear();
          main();
        }).catch(error => {
          console.clear();
          console.error(error.message);
          main();
        });
      });
    } else if (answer === "3") {
      console.clear();

      new ListTodos({todoRepository, todosPresenter}).execute().then(() => {
        return new Promise<void>((resolve, reject) => {
          readlineInterface.question("Identifier: ", todoIdentifier => {
            new RemoveTodo({todoRepository, todosPresenter}).execute({todoIdentifier}).then(() => {
              resolve();
            }).catch(error => {
              reject(error);
            });
          });
        });
      }).then(() => {
        console.clear();
        main();
      }).catch(error => {
        console.clear();
        console.error(error.message);
        main();
      });
    } else if (answer === "4") {
      console.clear();

      new ClearTodos({todoRepository, todosPresenter}).execute().then(() => {
        console.clear();
        main();
      }).catch(error => {
        console.clear();
        console.error(error.message);
        main();
      });
    } else if (answer === "5") {
      console.clear();
      readlineInterface.close();
      console.log("Bye.");
      process.exit(0);
    } else {
      console.clear();
      console.log("I did not understand that.");
      main();
    }
  });
}

console.clear();
main();
