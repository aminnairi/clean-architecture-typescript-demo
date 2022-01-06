import {TodoInterface} from "../../../../domain/entities/todo-interface";

export class Todo implements TodoInterface {
  public name: string;
  public identifier: string;

  constructor({name, identifier}: {name: string, identifier: string}) {
    this.name = name;
    this.identifier = identifier;
  }
}
