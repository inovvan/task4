import { MemoryManager } from "../calculator/MemoryManager.js";
import { Command } from "./Command.js";

export class MemoryCommand extends Command {
  constructor(calculator) {
    super(calculator);
    this.memoryManager = new MemoryManager(calculator);
  }
}

export class MemoryClearCommand extends MemoryCommand {
  execute() {
    this.memoryManager.memoryClear();
  }
}

export class MemoryAddCommand extends MemoryCommand {
  execute() {
    this.memoryManager.memoryAdd();
  }
}

export class MemorySubtractCommand extends MemoryCommand {
  execute() {
    this.memoryManager.memorySubtract();
  }
}

export class MemoryRecallCommand extends MemoryCommand {
  execute() {
    this.memoryManager.memoryRecall();
  }
}
