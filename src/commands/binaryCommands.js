import { BinaryOperationExecutor } from "../calculator/BinaryOperationExecutor.js";
import { Command } from "./Command.js";

class BinaryCommand extends Command {
  constructor(calculator, value) {
    super(calculator);
    this.value = value;
    this.binaryOperationExecutor = new BinaryOperationExecutor(calculator);
  }
}

export class OperatorCommand extends BinaryCommand {
  execute() {
    this.binaryOperationExecutor.setOperator(this.value);
  }
}

export class CalculateCommand extends BinaryCommand {
  execute() {
    this.binaryOperationExecutor.calculate();
  }
}
