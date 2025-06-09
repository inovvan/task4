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

  reset() {
    this.value = null;
    this.display = "0";
    this.currentInput = "0";
    this.operator = null;
    this.rootYDisplay = "";
    this.powDisplay = "";
  }

  repaintDisplay() {
    const displayElement = document.getElementById("display");
    const rootYElement = document.getElementById("root");
    const powerElement = document.getElementById("power");

    displayElement.textContent = this.display;
    rootYElement.textContent = this.rootYDisplay;
    powerElement.textContent = this.powDisplay;
  }

  resetAndRepaint() {
    this.reset();
    this.repaintDisplay();
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
}
