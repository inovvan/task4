export class Calculator {
  constructor() {
    this.value = null;
    this.display = "0";
    this.currentInput = "0";
    this.operator = null;
    this.rootYDisplay = "";
    this.powDisplay = "";
    this.memory = null;
  }

  repaintDisplay() {
    const displayElement = document.getElementById("display");
    const rootYElement = document.getElementById("root");
    const powerElement = document.getElementById("power");

    displayElement.textContent = this.display;
    rootYElement.textContent = this.rootYDisplay;
    powerElement.textContent = this.powDisplay;
  }

  reset() {
    this.value = null;
    this.display = "0";
    this.currentInput = "0";
    this.operator = null;
    this.rootYDisplay = "";
    this.powDisplay = "";
  }

  resetAndRepaint() {
    this.reset();
    this.repaintDisplay();
  }

  displayOperator() {
    switch (this.operator) {
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

  endOfOperation() {
    this.currentInput = String(this.currentInput);
    this.display = this.currentInput;
    this.operator = "done";
    this.value = null;
    this.rootYDisplay = "";
    this.powDisplay = "";
    this.repaintDisplay();
  }

  inputProcent() {
    if (
      this.currentInput === "0" ||
      this.currentInput.includes("%") ||
      !this.currentInput ||
      !this.value ||
      (this.operator !== "plus" &&
        this.operator !== "minus" &&
        this.operator !== "multiplication" &&
        this.operator !== "division")
    )
      return;
    this.currentInput += "%";
    this.display += "%";
    this.repaintDisplay();
  }

  procentCheck() {
    if (this.currentInput.includes("%")) {
      this.currentInput = this.currentInput.slice(0, -1);
      let currentValue = parseFloat(this.currentInput);
      if (this.operator === "plus" || this.operator === "minus") {
        this.currentInput = String(this.value * (currentValue / 100));
      } else if (
        this.operator === "multiplication" ||
        this.operator === "division"
      ) {
        this.currentInput = String(currentValue / 100);
      }
    }
  }

  inputDigit(digit) {
    if (this.currentInput === "0" && digit === "0") return;
    if (this.currentInput === "Error!") {
      this.reset();
    }
    if (digit === "." && this.currentInput.slice(-1) === ".") {
      // не позволяет вводить много точек
      return;
    } else if (digit === "." && this.operator === "done") {
      // если точка ставится после вычисления
      this.value = null;
      this.operator = null;
      this.currentInput = "0.";
      this.display = "0.";
    } else if (this.operator === "rootY") {
      // корень x в степени y
      this.currentInput += digit;
      this.rootYDisplay += digit;
    } else if (this.operator === "pow") {
      // x в степени y
      this.currentInput += digit;
      this.powDisplay += digit;
    } else if (digit === "." && this.currentInput === "") {
      // если точка ставится сразу после оператора
      this.currentInput = "0.";
      this.display += "0.";
    } else if (digit === ".") {
      this.currentInput += digit;
      this.display += digit;
    } else if (
      // "05" -> "5" для первого операнда
      this.currentInput === "0" &&
      this.display === "0" &&
      digit !== "0"
    ) {
      this.currentInput = digit;
      this.display = digit;
    } else if (
      // "05" -> "5"  для второго операнда
      this.currentInput === "0" &&
      this.display !== "0" &&
      digit !== "0"
    ) {
      this.currentInput = digit;
      this.display = this.display.slice(0, -1) + digit;
    } else if (this.operator === "done") {
      // начало нового ввода после вычисления
      this.value = null;
      this.operator = null;
      this.display = digit;
      this.currentInput = digit;
    } else {
      this.currentInput += digit;
      if (this.display.slice(-1) === ")") {
        this.display = this.display.slice(0, -1) + digit + ")";
      } else this.display += digit;
    }
    this.repaintDisplay();
  }

  setOperator(operator) {
    if (this.currentInput === "Error!") return;
    if (this.value === null) {
      this.value = parseFloat(this.currentInput);
      this.operator = operator;
    } else if (this.currentInput === "") {
      this.operator = operator;
    } else {
      this.calculate();
      if (this.display === "Error!") return;
      this.setOperator(operator);
    }
    this.currentInput = "";
    if (operator === "rootY") {
      this.display = this.displayOperator(operator) + this.value;
    } else {
      this.display = this.value + this.displayOperator(operator);
    }
    this.repaintDisplay();
  }

  changeSign() {
    if (this.currentInput === "Error!") return;
    if (this.currentInput === "" || this.currentInput === "0") return;

    if (this.operator === "rootY" || this.operator === "pow") {
      if (this.currentInput.startsWith("-")) {
        this.currentInput = this.currentInput.slice(1);
      } else {
        this.currentInput = "-" + this.currentInput;
      }
      if (this.operator === "rootY") {
        this.rootYDisplay = this.currentInput;
        this.repaintDisplay();
        return;
      }
      if (this.operator === "pow") {
        this.powDisplay = this.currentInput;
        this.repaintDisplay();
        return;
      }
    }

    const currentInputLength = this.currentInput.length;

    if (this.currentInput.startsWith("-")) {
      this.currentInput = this.currentInput.slice(1);
      this.display =
        this.value !== null
          ? this.display.slice(0, -(currentInputLength + 2)) + this.currentInput
          : (this.display = this.currentInput);
    } else {
      this.currentInput = "-" + this.currentInput;
      this.display =
        this.value !== null
          ? this.display.slice(0, -currentInputLength) +
            "(" +
            this.currentInput +
            ")"
          : (this.display = this.currentInput);
    }
    this.repaintDisplay();
  }

  factorial() {
    let fact = (value) => {
      if (value === 0) return 1;
      return value * fact(value - 1);
    };

    const currentValue = parseFloat(this.currentInput);
    if (currentValue < 0 || !Number.isInteger(currentValue)) {
      this.currentInput = "Error!";
    } else {
      this.currentInput = fact(currentValue);
    }

    this.endOfOperation();
  }

  root(y) {
    function pow(base, exponent) {
      let result = 1;
      for (let i = 0; i < exponent; i++) {
        result *= base;
      }
      return result;
    }

    function abs(n) {
      return n < 0 ? -n : n;
    }

    if (this.currentInput === "Error!") return;

    let x;

    if (y === undefined) {
      x = this.value;
      y = parseFloat(this.currentInput);
    } else {
      x = parseFloat(this.currentInput);
    }

    if ((x < 0 && y % 2 === 0) || y === 0) {
      this.currentInput = "Error!";
      this.endOfOperation();
      return;
    }

    if (x === 0) {
      this.currentInput = 0;
      this.endOfOperation();
      return;
    }

    let yAbs = abs(y);
    let guess = x / yAbs;
    let prevGuess;

    do {
      prevGuess = guess;
      guess = ((yAbs - 1) * guess + x / pow(guess, yAbs - 1)) / yAbs;
    } while (abs(guess - prevGuess) > 1e-10);

    guess = y < 0 ? 1 / guess : guess;

    this.currentInput = Math.round(guess * 1e9) / 1e9;
    this.endOfOperation();
  }

  pow(x, y) {
    if (this.currentInput === "Error!") return;

    if (!x && !y) {
      x = this.value;
      y = parseFloat(this.currentInput);
    } else if (!x && y) {
      x = parseFloat(this.currentInput);
    } else {
      y = parseFloat(this.currentInput);
    }

    const N = y < 0 ? -y : y;
    let result = 1;

    for (let i = 0; i < N; i++) {
      result *= x;
    }

    result = Math.round(result * 1e9) / 1e9;
    this.currentInput = y < 0 ? 1 / result : result;

    this.endOfOperation();
  }

  reciprocal() {
    if (this.currentInput === "Error!") return;
    const currentValue = parseFloat(this.currentInput);

    if (currentValue === 0) {
      this.currentInput = "Error!";
    } else {
      this.currentInput = 1 / currentValue;
    }

    this.endOfOperation();
  }

  calculate() {
    if (this.value === null || this.currentInput === "") return;
    this.procentCheck();
    const currentValue = parseFloat(this.currentInput);
    switch (this.operator) {
      case "plus":
        this.currentInput = this.value + currentValue;
        break;
      case "minus":
        this.currentInput = this.value - currentValue;
        break;
      case "multiplication":
        this.currentInput = this.value * currentValue;
        break;
      case "division":
        if (currentValue !== 0) {
          this.currentInput = this.value / currentValue;
        } else {
          this.currentInput = "Error!";
        }
        break;
      case "rootY":
        this.root();
        break;
      case "pow":
        this.pow();
        break;
    }

    if (this.currentInput !== "Error!") {
      this.currentInput = Math.round(this.currentInput * 1e9) / 1e9;
    }
    this.endOfOperation();
  }

  memoryClear() {
    this.memory = null;
  }

  memoryAdd() {
    if (this.currentInput === "Error!") return;
    let currentValue;
    if (this.currentInput === "") {
      currentValue = this.value;
    } else {
      currentValue = parseFloat(this.currentInput);
    }
    if (this.memory === null) {
      this.memory = currentValue;
    } else {
      this.memory += currentValue;
    }
  }

  memorySubtract() {
    if (this.currentInput === "Error!") return;
    const currentValue = parseFloat(this.currentInput);
    if (this.memory === null) {
      this.memory = -currentValue;
    } else {
      this.memory -= currentValue;
    }
  }

  memoryRecall() {
    if (this.memory === null) {
      return;
    } else {
      this.currentInput = String(this.memory);
    }
    if (this.value !== null) {
      if (this.operator === "rootY") {
        this.rootYDisplay = this.currentInput;
      } else if (this.operator === "pow") {
        this.powDisplay = this.currentInput;
      } else {
        this.display =
          this.value + this.displayOperator(this.operator) + this.currentInput;
      }
    } else {
      this.display = this.currentInput;
    }

    this.repaintDisplay();
  }
}
