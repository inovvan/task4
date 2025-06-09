import { UnaryOperationExecutor } from "./UnaryOperationExecutor.js";

export class BinaryOperationExecutor {
  constructor(calculator) {
    this.calculator = calculator;
    this.unaryOperationExecutor = new UnaryOperationExecutor(calculator);
  }

  displayOperator() {
    switch (this.calculator.operator) {
      case "plus":
        return "+";
      case "minus":
        return "-";
      case "multiplication":
        return "×";
      case "division":
        return "÷";
      case "rootY":
        return "√";
      case "pow":
        return "";
    }
  }

  procentCheck() {
    const c = this.calculator;

    if (c.currentInput.includes("%")) {
      c.currentInput = c.currentInput.slice(0, -1);
      let currentValue = parseFloat(c.currentInput);
      if (c.operator === "plus" || c.operator === "minus") {
        c.currentInput = String(c.value * (currentValue / 100));
      } else if (c.operator === "multiplication" || c.operator === "division") {
        c.currentInput = String(currentValue / 100);
      }
    }
  }

  setOperator(operator) {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;
    if (c.value === null) {
      c.value = parseFloat(c.currentInput);
      c.operator = operator;
    } else if (c.currentInput === "") {
      c.operator = operator;
    } else {
      this.calculate();
      if (c.display === "Error!") return;
      this.setOperator(operator);
    }
    c.currentInput = "";
    if (operator === "rootY") {
      c.display = this.displayOperator(operator) + c.value;
    } else {
      c.display = c.value + this.displayOperator(operator);
    }

    c.repaintDisplay();
  }

  calculate() {
    const c = this.calculator;

    if (c.value === null || c.currentInput === "") return;
    this.procentCheck();
    const currentValue = parseFloat(c.currentInput);
    switch (c.operator) {
      case "plus":
        c.currentInput = c.value + currentValue;
        break;
      case "minus":
        c.currentInput = c.value - currentValue;
        break;
      case "multiplication":
        c.currentInput = c.value * currentValue;
        break;
      case "division":
        if (currentValue !== 0) {
          c.currentInput = c.value / currentValue;
        } else {
          c.currentInput = "Error!";
        }
        break;
      case "rootY":
        this.unaryOperationExecutor.root();
        console.log("QWE");
        break;
      case "pow":
        this.unaryOperationExecutor.pow();
        break;
    }

    if (c.currentInput !== "Error!") {
      c.currentInput = Math.round(c.currentInput * 1e9) / 1e9;
    }
    c.endOfOperation();
  }
}
