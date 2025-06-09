export class UnaryOperationExecutor {
  constructor(calculator) {
    this.calculator = calculator;
  }

  factorial() {
    const c = this.calculator;

    let fact = (value) => {
      if (value === 0) return 1;
      return value * fact(value - 1);
    };

    const currentValue = parseFloat(c.currentInput);
    if (currentValue < 0 || !Number.isInteger(currentValue)) {
      c.currentInput = "Error!";
    } else {
      c.currentInput = fact(currentValue);
    }

    c.endOfOperation();
  }

  root(y) {
    const c = this.calculator;

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

    if (c.currentInput === "Error!") return;

    let x;

    if (y === undefined) {
      x = c.value;
      y = parseFloat(c.currentInput);
    } else {
      x = parseFloat(c.currentInput);
    }

    if ((x < 0 && y % 2 === 0) || y === 0) {
      c.currentInput = "Error!";
      c.endOfOperation();
      return;
    }

    if (x === 0) {
      c.currentInput = 0;
      c.endOfOperation();
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

    c.currentInput = Math.round(guess * 1e9) / 1e9;
    c.endOfOperation();
  }

  pow(x, y) {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;

    if (!x && !y) {
      x = c.value;
      y = parseFloat(c.currentInput);
    } else if (!x && y) {
      x = parseFloat(c.currentInput);
    } else {
      y = parseFloat(c.currentInput);
    }

    const N = y < 0 ? -y : y;
    let result = 1;

    for (let i = 0; i < N; i++) {
      result *= x;
    }

    result = Math.round(result * 1e9) / 1e9;
    c.currentInput = y < 0 ? 1 / result : result;

    c.endOfOperation();
  }

  reciprocal() {
    const c = this.calculator;

    if (c.currentInput === "Error!") return;
    const currentValue = parseFloat(c.currentInput);

    if (currentValue === 0) {
      c.currentInput = "Error!";
    } else {
      c.currentInput = 1 / currentValue;
    }

    c.endOfOperation();
  }
}
