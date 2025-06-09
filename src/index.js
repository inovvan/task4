import "./style.css";
import { Calculator } from "./calculator/Calculator.js";
import { CommandInvoker } from "./invoker.js";
import { DigitInputCommand } from "./commands/InputCommand.js";
import {
  OperatorCommand,
  CalculateCommand,
} from "./commands/binaryCommands.js";
import { ChangeSignCommand } from "./commands/ChangeSignCommand.js";
import { ResetCommand } from "./commands/ResetCommand.js";
import {
  FactorialCommand,
  CubeRootCommand,
  CubeCommand,
  SquareRootCommand,
  SquareCommand,
  ReciprocalCommand,
  PowerOfTenCommand,
} from "./commands/unaryCommands.js";
import {
  MemoryClearCommand,
  MemoryRecallCommand,
  MemorySubtractCommand,
  MemoryAddCommand,
} from "./commands/memoryCommands.js";

const calculator = new Calculator();
const invoker = new CommandInvoker();

document.getElementById("buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const type = btn.dataset.type;
  const value = btn.dataset.value;

  switch (type) {
    case "reset":
      invoker.executeCommand(new ResetCommand(calculator));
      invoker.clearCommands();
      break;
    case "digit":
      invoker.executeCommand(new DigitInputCommand(calculator, value));
      break;
    case "operator":
      invoker.executeCommand(new OperatorCommand(calculator, value));
      break;
    case "calculate":
      invoker.executeCommand(new CalculateCommand(calculator));
      break;
    case "undo":
      invoker.undoCommand();
      break;
    case "sign":
      invoker.executeCommand(new ChangeSignCommand(calculator));
      break;
    case "factorial":
      invoker.executeCommand(new FactorialCommand(calculator));
      break;
    case "cubeRoot":
      invoker.executeCommand(new CubeRootCommand(calculator));
      break;
    case "cube":
      invoker.executeCommand(new CubeCommand(calculator));
      break;
    case "squareRoot":
      invoker.executeCommand(new SquareRootCommand(calculator));
      break;
    case "square":
      invoker.executeCommand(new SquareCommand(calculator));
      break;
    case "reciprocal":
      invoker.executeCommand(new ReciprocalCommand(calculator));
      break;
    case "powerOfTen":
      invoker.executeCommand(new PowerOfTenCommand(calculator));
      break;
    case "MC":
      invoker.executeCommand(new MemoryClearCommand(calculator));
      break;
    case "M+":
      invoker.executeCommand(new MemoryAddCommand(calculator));
      break;
    case "M-":
      invoker.executeCommand(new MemorySubtractCommand(calculator));
      break;
    case "MR":
      invoker.executeCommand(new MemoryRecallCommand(calculator));
      break;
  }
});
