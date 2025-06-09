import { UnaryOperationExecutor } from "../calculator/UnaryOperationExecutor.js";
import { Command } from "./Command.js";

class UnaryCommand extends Command {
  constructor(calculator) {
    super(calculator);
    this.unaryOperationExecutor = new UnaryOperationExecutor(calculator);
  }
}

export class FactorialCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.factorial();
  }
}

export class CubeRootCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.root(3);
  }
}

export class CubeCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.pow(undefined, 3);
  }
}

export class SquareRootCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.root(2);
  }
}

export class SquareCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.pow(undefined, 2);
  }
}

export class ReciprocalCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.reciprocal();
  }
}

export class PowerOfTenCommand extends UnaryCommand {
  execute() {
    this.unaryOperationExecutor.pow(10);
  }
}
