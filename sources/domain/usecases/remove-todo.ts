import {TodosPresenterInterface} from "../../domain/presenters/todos-presenter-interface";
import {TodoRepositoryInterface} from "../../domain/repositories/todo-repository-interface";

export class RemoveTodo {
  private todoRepository: TodoRepositoryInterface;
  private todosPresenter: TodosPresenterInterface;

  constructor({todoRepository, todosPresenter}: {todoRepository: TodoRepositoryInterface, todosPresenter: TodosPresenterInterface}) {
    this.todoRepository = todoRepository;
    this.todosPresenter = todosPresenter;
  }

  execute({todoIdentifier}: {todoIdentifier: string}): Promise<void> {
    return this.todoRepository.remove({todoIdentifier}).then(() => {
      return this.todoRepository.all();
    }).then(todos => {
      return this.todosPresenter.present({todos});
    });
  }
}
