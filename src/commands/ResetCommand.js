import { Command } from "./Command.js";

export class ResetCommand extends Command {
  execute() {
    this.calculator.resetAndRepaint();
  }
}
