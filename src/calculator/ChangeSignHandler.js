export class ChangeSignHandler {
  constructor(calculator) {
    this.calculator = calculator;
  }

  changeSign() {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;
    if (c.currentInput === "" || c.currentInput === "0") return;

    if (c.operator === "rootY" || c.operator === "pow") {
      if (c.currentInput.startsWith("-")) {
        c.currentInput = c.currentInput.slice(1);
      } else {
        c.currentInput = "-" + c.currentInput;
      }
      if (c.operator === "rootY") {
        c.rootYDisplay = c.currentInput;
        c.repaintDisplay();
        return;
      }
      if (c.operator === "pow") {
        c.powDisplay = c.currentInput;
        c.repaintDisplay();
        return;
      }
    }

    const currentInputLength = c.currentInput.length;

    if (c.currentInput.startsWith("-")) {
      c.currentInput = c.currentInput.slice(1);
      c.display =
        c.value !== null
          ? c.display.slice(0, -(currentInputLength + 2)) + c.currentInput
          : (c.display = c.currentInput);
    } else {
      c.currentInput = "-" + c.currentInput;
      c.display =
        c.value !== null
          ? c.display.slice(0, -currentInputLength) + "(" + c.currentInput + ")"
          : (c.display = c.currentInput);
    }
    c.repaintDisplay();
  }
}
