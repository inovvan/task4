import { Calculator } from "../src/calculator.js";
import { describe, expect, beforeEach, it } from "@jest/globals";

describe("Calculator", () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
    document.body.innerHTML = `
    <div id="display"></div>
    <div id="root"></div>
    <div id="power"></div>
  `;
  });

  describe("calculate", () => {
    it("sum of numbers 1", () => {
      calc.value = 10;
      calc.currentInput = "5";
      calc.operator = "plus";
      calc.calculate();
      expect(calc.currentInput).toBe("15");
    });

    it("sum of numbers 2", () => {
      calc.value = -10;
      calc.currentInput = "-5";
      calc.operator = "plus";
      calc.calculate();
      expect(calc.currentInput).toBe("-15");
    });

    it("subtracts two numbers 1", () => {
      calc.value = 10;
      calc.currentInput = "4";
      calc.operator = "minus";
      calc.calculate();
      expect(calc.currentInput).toBe("6");
    });

    it("subtracts two numbers 2", () => {
      calc.value = 10;
      calc.currentInput = "-4";
      calc.operator = "minus";
      calc.calculate();
      expect(calc.currentInput).toBe("14");
    });

    it("multiplies two numbers 1", () => {
      calc.value = 3;
      calc.currentInput = "4";
      calc.operator = "multiplication";
      calc.calculate();
      expect(calc.currentInput).toBe("12");
    });

    it("multiplies two numbers 2", () => {
      calc.value = 5;
      calc.currentInput = "-1";
      calc.operator = "multiplication";
      calc.calculate();
      expect(calc.currentInput).toBe("-5");
    });

    it("divides two numbers", () => {
      calc.value = 12;
      calc.currentInput = "4";
      calc.operator = "division";
      calc.calculate();
      expect(calc.currentInput).toBe("3");
    });

    it("returns error when dividing by zero", () => {
      calc.value = 5;
      calc.currentInput = "0";
      calc.operator = "division";
      calc.calculate();
      expect(calc.currentInput).toBe("Error!");
    });

    it("calculates percentage for addition", () => {
      calc.value = 200;
      calc.operator = "plus";
      calc.currentInput = "10%";
      calc.calculate();
      expect(calc.currentInput).toBe("220");
    });

    it("calculates percentage for subtract", () => {
      calc.value = 100;
      calc.operator = "minus";
      calc.currentInput = "60%";
      calc.calculate();
      expect(calc.currentInput).toBe("40");
    });

    it("calculates percentage for multiplication", () => {
      calc.value = 1200;
      calc.operator = "multiplication";
      calc.currentInput = "10%";
      calc.calculate();
      expect(calc.currentInput).toBe("120");
    });

    it("calculates percentage for division", () => {
      calc.value = 300;
      calc.operator = "division";
      calc.currentInput = "30%";
      calc.calculate();
      expect(calc.currentInput).toBe("1000");
    });
  });

  describe("factorial", () => {
    it("returns factorial for positive integers", () => {
      calc.currentInput = "5";
      calc.factorial();
      expect(calc.currentInput).toBe("120");
    });

    it("returns 1 for 0!", () => {
      calc.currentInput = "0";
      calc.factorial();
      expect(calc.currentInput).toBe("1");
    });

    it("returns error for negative input", () => {
      calc.currentInput = "-3";
      calc.factorial();
      expect(calc.currentInput).toBe("Error!");
    });

    it("returns error for non-integer input", () => {
      calc.currentInput = "3.5";
      calc.factorial();
      expect(calc.currentInput).toBe("Error!");
    });
  });

  describe("reciprocal", () => {
    it("calculates reciprocal for positive number", () => {
      calc.currentInput = "4";
      calc.reciprocal();
      expect(calc.currentInput).toBe("0.25");
    });

    it("returns error for zero", () => {
      calc.currentInput = "0";
      calc.reciprocal();
      expect(calc.currentInput).toBe("Error!");
    });
  });

  describe("pow", () => {
    it("raises value to positive exponent", () => {
      calc.value = 2;
      calc.currentInput = "3";
      calc.pow();
      expect(calc.currentInput).toBe("8");
    });

    it("raises value to negative exponent", () => {
      calc.value = 2;
      calc.currentInput = "-3";
      calc.pow();
      expect(calc.currentInput).toBe("0.125");
    });

    it("returns 1 of zero exponent", () => {
      calc.value = 7;
      calc.currentInput = "0";
      calc.pow();
      expect(calc.currentInput).toBe("1");
    });
  });

  describe("root", () => {
    it("computes cube root", () => {
      calc.value = 8;
      calc.currentInput = "3";
      calc.root();
      expect(calc.currentInput).toBe("2");
    });

    it("computes square root", () => {
      calc.value = 81;
      calc.currentInput = "2";
      calc.root();
      expect(calc.currentInput).toBe("9");
    });

    it("computes valid root (negative base and odd root)", () => {
      calc.value = -27;
      calc.currentInput = "3";
      calc.root();
      expect(calc.currentInput).toBe("-3");
    });

    it("returns error for even root of negative number", () => {
      calc.value = -16;
      calc.currentInput = "2";
      calc.root();
      expect(calc.currentInput).toBe("Error!");
    });

    it("returns error for zero root", () => {
      calc.value = 12;
      calc.currentInput = "0";
      calc.root();
      expect(calc.currentInput).toBe("Error!");
    });

    it("computes root of zero", () => {
      calc.value = 0;
      calc.currentInput = "3";
      calc.root();
      expect(calc.currentInput).toBe("0");
    });
  });

  describe("memory", () => {
    it("memory add", () => {
      calc.currentInput = "32";
      calc.memoryAdd();
      expect(calc.memory).toBe(32);
    });

    it("memory subtract", () => {
      calc.currentInput = "32";
      calc.memoryAdd();
      calc.currentInput = "25";
      calc.memorySubtract();
      expect(calc.memory).toBe(7);
    });

    it("memory recall", () => {
      calc.currentInput = "32";
      calc.memoryAdd();
      expect(calc.memory).toBe(32);
      calc.memoryRecall();
      expect(calc.currentInput).toBe("32");
    });

    it("memory clear", () => {
      calc.currentInput = "31";
      calc.memoryAdd();
      calc.currentInput = "20";
      calc.memorySubtract();
      expect(calc.memory).toBe(11);
      calc.memoryClear();
      expect(calc.memory).toBe(null);
    });
  });
});
