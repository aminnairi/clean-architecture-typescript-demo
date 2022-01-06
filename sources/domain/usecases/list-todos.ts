import {TodoRepositoryInterface} from "../repositories/todo-repository-interface";
import {TodosPresenterInterface} from "../presenters/todos-presenter-interface";

export class ListTodos {
  private todoRepository: TodoRepositoryInterface;
  private todosPresenter: TodosPresenterInterface;

  constructor({todoRepository, todosPresenter}: {todoRepository: TodoRepositoryInterface, todosPresenter: TodosPresenterInterface}) {
    this.todoRepository = todoRepository;
    this.todosPresenter = todosPresenter;
  }

  execute() {
    return this.todoRepository.all().then(todos => {
      return this.todosPresenter.present({todos});
    });
  }
}
