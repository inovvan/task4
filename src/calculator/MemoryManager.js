export class MemoryManager {
  constructor(calculator) {
    this.calculator = calculator;
  }

  memoryClear() {
    this.calculator.memory = null;
  }

  memoryAdd() {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;
    let currentValue;
    if (c.currentInput === "") {
      currentValue = c.value;
    } else {
      currentValue = parseFloat(c.currentInput);
    }
    if (c.memory === null) {
      c.memory = currentValue;
    } else {
      c.memory += currentValue;
    }
  }

  memorySubtract() {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;
    const currentValue = parseFloat(c.currentInput);
    if (c.memory === null) {
      c.memory = -currentValue;
    } else {
      c.memory -= currentValue;
    }
  }

  memoryRecall() {
    const c = this.calculator;

    if (c.memory === null) {
      return;
    } else {
      c.currentInput = String(c.memory);
    }
    if (c.value !== null) {
      if (c.operator === "rootY") {
        c.rootYDisplay = c.currentInput;
      } else if (c.operator === "pow") {
        c.powDisplay = c.currentInput;
      } else {
        c.display = c.value + c.displayOperator(c.operator) + c.currentInput;
      }
    } else {
      c.display = c.currentInput;
    }

    c.repaintDisplay();
  }
}
