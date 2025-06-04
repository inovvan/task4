class Command {
  constructor(calculator, value) {
    this.calculator = calculator;
    this.state = { ...calculator };
    this.value = value;
  }

  execute() {}

  undo() {
    Object.assign(this.calculator, this.state);
    this.calculator.repaintDisplay();
  }
}

export class DigitInputCommand extends Command {
  execute() {
    this.calculator.inputDigit(this.value);
  }
}

export class ProcentInputCommand extends Command {
  execute() {
    this.calculator.inputProcent();
  }
}

export class OperatorCommand extends Command {
  execute() {
    this.calculator.setOperator(this.value);
  }
}

export class CalculateCommand extends Command {
  execute() {
    this.calculator.calculate();
  }
}

export class ResetCommand extends Command {
  execute() {
    this.calculator.resetAndRepaint();
  }
}

export class ChangeSignCommand extends Command {
  execute() {
    this.calculator.changeSign();
  }
}

export class FactorialCommand extends Command {
  execute() {
    this.calculator.factorial();
  }
}

export class CubeRootCommand extends Command {
  execute() {
    this.calculator.root(3);
  }
}

export class CubeCommand extends Command {
  execute() {
    this.calculator.pow(undefined, 3);
  }
}

export class SquareRootCommand extends Command {
  execute() {
    this.calculator.root(2);
  }
}

export class SquareCommand extends Command {
  execute() {
    this.calculator.pow(undefined, 2);
  }
}

export class ReciprocalCommand extends Command {
  execute() {
    this.calculator.reciprocal();
  }
}

export class PowerOfTenCommand extends Command {
  execute() {
    this.calculator.pow(10);
  }
}

export class MemoryClearCommand extends Command {
  execute() {
    this.calculator.memoryClear();
  }
}

export class MemoryAddCommand extends Command {
  execute() {
    this.calculator.memoryAdd();
  }
}

export class MemorySubtractCommand extends Command {
  execute() {
    this.calculator.memorySubtract();
  }
}

export class MemoryRecallCommand extends Command {
  execute() {
    this.calculator.memoryRecall();
  }
}
