import { Calculator } from "../src/calculator/Calculator.js";
import { describe, expect, beforeEach, it } from "@jest/globals";
import { BinaryOperationExecutor } from "../src/calculator/BinaryOperationExecutor.js";
import { UnaryOperationExecutor } from "../src/calculator/UnaryOperationExecutor.js";
import { MemoryManager } from "../src/calculator/MemoryManager.js";

describe("Calculator", () => {
  let calc;
  let binaryOperationExecutor;
  let unaryOperationExecutor;
  let memoryManager;

  beforeEach(() => {
    calc = new Calculator();
    binaryOperationExecutor = new BinaryOperationExecutor(calc);
    unaryOperationExecutor = new UnaryOperationExecutor(calc);
    memoryManager = new MemoryManager(calc);

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
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("15");
    });

    it("sum of numbers 2", () => {
      calc.value = -10;
      calc.currentInput = "-5";
      calc.operator = "plus";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("-15");
    });

    it("subtracts two numbers 1", () => {
      calc.value = 10;
      calc.currentInput = "4";
      calc.operator = "minus";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("6");
    });

    it("subtracts two numbers 2", () => {
      calc.value = 10;
      calc.currentInput = "-4";
      calc.operator = "minus";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("14");
    });

    it("multiplies two numbers 1", () => {
      calc.value = 3;
      calc.currentInput = "4";
      calc.operator = "multiplication";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("12");
    });

    it("multiplies two numbers 2", () => {
      calc.value = 5;
      calc.currentInput = "-1";
      calc.operator = "multiplication";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("-5");
    });

    it("divides two numbers", () => {
      calc.value = 12;
      calc.currentInput = "4";
      calc.operator = "division";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("3");
    });

    it("returns error when dividing by zero", () => {
      calc.value = 5;
      calc.currentInput = "0";
      calc.operator = "division";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("Error!");
    });

    it("calculates percentage for addition", () => {
      calc.value = 200;
      calc.operator = "plus";
      calc.currentInput = "10%";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("220");
    });

    it("calculates percentage for subtract", () => {
      calc.value = 100;
      calc.operator = "minus";
      calc.currentInput = "60%";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("40");
    });

    it("calculates percentage for multiplication", () => {
      calc.value = 1200;
      calc.operator = "multiplication";
      calc.currentInput = "10%";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("120");
    });

    it("calculates percentage for division", () => {
      calc.value = 300;
      calc.operator = "division";
      calc.currentInput = "30%";
      binaryOperationExecutor.calculate();
      expect(calc.currentInput).toBe("1000");
    });
  });

  describe("factorial", () => {
    it("returns factorial for positive integers", () => {
      calc.currentInput = "5";
      unaryOperationExecutor.factorial();
      expect(calc.currentInput).toBe("120");
    });

    it("returns 1 for 0!", () => {
      calc.currentInput = "0";
      unaryOperationExecutor.factorial();
      expect(calc.currentInput).toBe("1");
    });

    it("returns error for negative input", () => {
      calc.currentInput = "-3";
      unaryOperationExecutor.factorial();
      expect(calc.currentInput).toBe("Error!");
    });

    it("returns error for non-integer input", () => {
      calc.currentInput = "3.5";
      unaryOperationExecutor.factorial();
      expect(calc.currentInput).toBe("Error!");
    });
  });

  describe("reciprocal", () => {
    it("calculates reciprocal for positive number", () => {
      calc.currentInput = "4";
      unaryOperationExecutor.reciprocal();
      expect(calc.currentInput).toBe("0.25");
    });

    it("returns error for zero", () => {
      calc.currentInput = "0";
      unaryOperationExecutor.reciprocal();
      expect(calc.currentInput).toBe("Error!");
    });
  });

  describe("pow", () => {
    it("raises value to positive exponent", () => {
      calc.value = 2;
      calc.currentInput = "3";
      unaryOperationExecutor.pow();
      expect(calc.currentInput).toBe("8");
    });

    it("raises value to negative exponent", () => {
      calc.value = 2;
      calc.currentInput = "-3";
      unaryOperationExecutor.pow();
      expect(calc.currentInput).toBe("0.125");
    });

    it("returns 1 of zero exponent", () => {
      calc.value = 7;
      calc.currentInput = "0";
      unaryOperationExecutor.pow();
      expect(calc.currentInput).toBe("1");
    });
  });

  describe("root", () => {
    it("computes cube root", () => {
      calc.value = 8;
      calc.currentInput = "3";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("2");
    });

    it("computes square root", () => {
      calc.value = 81;
      calc.currentInput = "2";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("9");
    });

    it("computes valid root (negative base and odd root)", () => {
      calc.value = -27;
      calc.currentInput = "3";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("-3");
    });

    it("returns error for even root of negative number", () => {
      calc.value = -16;
      calc.currentInput = "2";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("Error!");
    });

    it("returns error for zero root", () => {
      calc.value = 12;
      calc.currentInput = "0";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("Error!");
    });

    it("computes root of zero", () => {
      calc.value = 0;
      calc.currentInput = "3";
      unaryOperationExecutor.root();
      expect(calc.currentInput).toBe("0");
    });
  });

  describe("memory", () => {
    it("memory add", () => {
      calc.currentInput = "32";
      memoryManager.memoryAdd();
      expect(calc.memory).toBe(32);
    });

    it("memory subtract", () => {
      calc.currentInput = "32";
      memoryManager.memoryAdd();
      calc.currentInput = "25";
      memoryManager.memorySubtract();
      expect(calc.memory).toBe(7);
    });

    it("memory recall", () => {
      calc.currentInput = "32";
      memoryManager.memoryAdd();
      expect(calc.memory).toBe(32);
      memoryManager.memoryRecall();
      expect(calc.currentInput).toBe("32");
    });

    it("memory clear", () => {
      calc.currentInput = "31";
      memoryManager.memoryAdd();
      calc.currentInput = "20";
      memoryManager.memorySubtract();
      expect(calc.memory).toBe(11);
      memoryManager.memoryClear();
      expect(calc.memory).toBe(null);
    });
  });
});
