import {TodoInterface} from "../entities/todo-interface";
import {TodoRepositoryInterface} from "../repositories/todo-repository-interface";
import {TodosPresenterInterface} from "../presenters/todos-presenter-interface";

export class AddTodo {
  private todoRepository: TodoRepositoryInterface;
  private todosPresenter: TodosPresenterInterface;

  public constructor({todoRepository, todosPresenter}: {todoRepository: TodoRepositoryInterface, todosPresenter: TodosPresenterInterface}) {
    this.todoRepository = todoRepository;
    this.todosPresenter = todosPresenter;
  }

  public execute({todo}: {todo: TodoInterface}): Promise<void> {
    return this.todoRepository.add({todo}).then(() => {
      return this.todoRepository.all();
    }).then((todos) => {
      this.todosPresenter.present({todos});
    });
  }
}
