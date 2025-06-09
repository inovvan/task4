import { ChangeSignHandler } from "../calculator/ChangeSignHandler.js";
import { Command } from "./Command.js";

export class ChangeSignCommand extends Command {
  constructor(calculator) {
    super(calculator);
    this.changeSignHandler = new ChangeSignHandler(calculator);
  }

  execute() {
    this.changeSignHandler.changeSign();
  }
}
