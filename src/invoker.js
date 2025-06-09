export class CommandInvoker {
  constructor() {
    this.commands = [];
  }

  executeCommand(command) {
    command.execute();
    this.commands.push(command);
  }

  undoCommand() {
    const command = this.commands.pop();
    if (command) {
      command.undo();
    }
  }

  clearCommands() {
    this.commands.length = 0;
  }
}
