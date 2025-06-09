export class Command {
  constructor(calculator) {
    this.calculator = calculator;
    this.initialState = { ...calculator };
  }

  execute() {}

  undo() {
    Object.assign(this.calculator, this.initialState);
    this.calculator.repaintDisplay();
  }
}
