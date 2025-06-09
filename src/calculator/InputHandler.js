export class InputHandler {
  constructor(calculator) {
    this.calculator = calculator;
  }

  inputDigit(digit) {
    const c = this.calculator;

    if (c.currentInput === "0" && digit === "0") return;
    if (c.currentInput === "Error!") {
      c.reset();
    }

    if (digit === "%") {
      this.handleInputProcent();
      return;
    }

    if (digit === ".") {
      this.handleDecimalPoint();
      return;
    }

    if (c.operator === "rootY") {
      // корень x в степени y
      c.currentInput += digit;
      c.rootYDisplay += digit;
      c.repaintDisplay();
      return;
    }

    if (c.operator === "pow") {
      // x в степени y
      c.currentInput += digit;
      c.powDisplay += digit;
      c.repaintDisplay();
      return;
    }

    if (c.operator === "done") {
      this.startNewInput(digit);
      return;
    }

    this.handleRegularDigit(digit);
  }

  handleInputProcent() {
    const c = this.calculator;

    if (
      c.currentInput === "0" ||
      c.currentInput.includes("%") ||
      !c.currentInput ||
      !c.value ||
      (c.operator !== "plus" &&
        c.operator !== "minus" &&
        c.operator !== "multiplication" &&
        c.operator !== "division")
    )
      return;
    c.currentInput += "%";
    c.display += "%";
    c.repaintDisplay();
  }

  handleDecimalPoint() {
    const c = this.calculator;

    if (c.currentInput.slice(-1) === ".") return;

    if (c.operator === "done") {
      c.value = null;
      c.operator = null;
      c.currentInput = "0.";
      c.display = "0.";
    } else if (c.currentInput === "") {
      c.currentInput = "0.";
      c.display += "0.";
    } else {
      c.currentInput += ".";
      c.display += ".";
    }

    c.repaintDisplay();
  }

  startNewInput(digit) {
    const c = this.calculator;

    c.value = null;
    c.operator = null;
    c.currentInput = digit;
    c.display = digit;
    c.repaintDisplay();
  }

  handleRegularDigit(digit) {
    const c = this.calculator;
    const isFirstOperand = c.currentInput === "0" && c.display === "0";
    const isSecondOperand = c.currentInput === "0" && c.display !== "0";
    if (isFirstOperand && digit !== "0") {
      c.currentInput = digit;
      c.display = digit;
    } else if (isSecondOperand && digit !== "0") {
      c.currentInput = digit;
      c.display = c.display.slice(0, -1) + digit;
    } else {
      c.currentInput += digit;
      if (c.display.slice(-1) === ")") {
        c.display = c.display.slice(0, -1) + digit + ")";
      } else c.display += digit;
    }
    c.repaintDisplay();
  }
}
