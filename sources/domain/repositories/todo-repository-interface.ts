import {TodoInterface} from "../entities/todo-interface";

export interface TodoRepositoryInterface {
  add({todo}: {todo: TodoInterface}): Promise<void>;
  all(): Promise<Array<TodoInterface>>;
  removeAll(): Promise<void>;
  remove({todoIdentifier}: {todoIdentifier: string}): Promise<void>;
};
