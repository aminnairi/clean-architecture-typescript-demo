import {TodoRepositoryInterface} from "../repositories/todo-repository-interface";
import {TodosPresenterInterface} from "../presenters/todos-presenter-interface";

export class ClearTodos {
  private todoRepository: TodoRepositoryInterface;
  private todosPresenter: TodosPresenterInterface;

  public constructor({todoRepository, todosPresenter}: {todoRepository: TodoRepositoryInterface, todosPresenter: TodosPresenterInterface}) {
    this.todoRepository = todoRepository;
    this.todosPresenter = todosPresenter;
  }

  public execute() {
    return this.todoRepository.removeAll().then(() => {
      return this.todoRepository.all();
    }).then(todos => {
      return this.todosPresenter.present({todos});
    });
  }
}
