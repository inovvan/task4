import { InputHandler } from "../calculator/InputHandler.js";
import { Command } from "./Command.js";

export class DigitInputCommand extends Command {
  constructor(calculator, value) {
    super(calculator);
    this.value = value;
    this.inputHandler = new InputHandler(calculator);
  }

  execute() {
    this.inputHandler.inputDigit(this.value);
  }
}
