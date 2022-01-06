import {TodoInterface} from "../../../../domain/entities/todo-interface";

export class Todo implements TodoInterface {
  public name: string
  public identifier: string;

  public constructor({name, identifier}: {name: string, identifier: string}) {
    this.identifier = identifier;
    this.name = name;
  }
}
