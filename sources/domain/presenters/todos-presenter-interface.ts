import {TodoInterface} from "../entities/todo-interface";

export interface TodosPresenterInterface {
  present({todos}: {todos: Array<TodoInterface>}): Promise<void>;
}
