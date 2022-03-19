import UIElements from "./UIElements";
import CalculatorUI from "./CalculatorUI";
import CalculatorBrain from "./CalculatorBrain";

document.getElementById("body")!.style.fontFamily = "Jura, sans-serif"

let uiElements: UIElements = new UIElements();
let calculatorUIs: CalculatorUI[] = [];

let calculatorCount: number = -1
let contentDiv: HTMLDivElement = uiElements.contentDiv();
document.body.prepend(contentDiv)

function addCalculator(): void {
    calculatorCount++;
    let calculatorDiv: HTMLDivElement = uiElements.calculatorDiv(calculatorCount);

    let displayInput: HTMLInputElement = uiElements.displayInput(calculatorCount);
    calculatorDiv.appendChild(displayInput);
    let buttonRows: HTMLDivElement[] = createButtonRows();

    addNumButtonsToRow(buttonRows[0], 7, 9);
    addNumButtonsToRow(buttonRows[1], 4, 6);
    addNumButtonsToRow(buttonRows[2], 1, 3);

    let negativeButton: HTMLButtonElement =
        uiElements
            .button("negative", "+/-", "bg-secondary", "text-white", calculatorCount);
    let decimalButton: HTMLButtonElement =
        uiElements.button("decimal", ".", "bg-secondary", "text-white", calculatorCount);
    buttonRows[3].appendChild(negativeButton);
    addNumButtonsToRow(buttonRows[3], 0, 0);
    buttonRows[3].appendChild(decimalButton);

    let divideButton: HTMLButtonElement =
        uiElements.button("divide", "/", "bg-warning", "text-white", calculatorCount);
    let multiplyButton: HTMLButtonElement =
        uiElements.button("multiply", "*", "bg-warning", "text-white", calculatorCount);
    let minusButton: HTMLButtonElement =
        uiElements.button("minus", "-", "bg-warning", "text-white", calculatorCount);
    let plusButton: HTMLButtonElement =
        uiElements.button("plus", "+", "bg-warning", "text-white", calculatorCount);

    buttonRows[0].appendChild(divideButton);
    buttonRows[1].appendChild(multiplyButton);
    buttonRows[2].appendChild(minusButton);
    buttonRows[3].appendChild(plusButton);

    let evalButton: HTMLButtonElement = uiElements.evalButton("calculate", "=", calculatorCount);
    let backspaceButton: HTMLButtonElement =
        uiElements.button("backspace", "C", "bg-danger", "text-white", calculatorCount);
    let clearButton: HTMLButtonElement =
        uiElements.button("clear", "AC", "bg-danger", "text-white", calculatorCount);

    buttonRows[4].appendChild(evalButton);
    buttonRows[4].appendChild(backspaceButton);
    buttonRows[4].appendChild(clearButton);

    for (let i: number = 0; i < buttonRows.length; i++) {
        calculatorDiv.appendChild(buttonRows[i]);
    }
    contentDiv.appendChild(calculatorDiv);

    let ui: CalculatorUI = new CalculatorUI(new CalculatorBrain(), calculatorCount);
    ui.update();
    calculatorUIs.push(ui);
}

function createButtonRows(): HTMLDivElement[] {
    let buttonRows: HTMLDivElement[] = [];
    for (let i: number = 0; i < 5; i++) {
        let buttonRowDiv: HTMLDivElement = uiElements.buttonRowDiv(i, calculatorCount);
        buttonRows.push(buttonRowDiv);
    }
    return buttonRows;
}

function addNumButtonsToRow(row: HTMLDivElement, startNumber: number, endNumber: number): void {
    for (let i: number = startNumber; i < endNumber + 1; i++) {
        let numButton: HTMLButtonElement =
            uiElements
                .button(i.toString(), i.toString(), "bg-white", "text-black", calculatorCount)
        row.appendChild(numButton);
    }
}

function removeCalculator(): void {
    if (calculatorCount < 0) return;
    let calculator = contentDiv.querySelector(".calculator-" + calculatorCount)
    if (calculator !== null) {
        calculator.remove();
    }

    calculatorCount--;
    calculatorUIs.pop();
}

function addDynamicButtons(): void {
    let buttonAdd: HTMLButtonElement = document.createElement("button");
    buttonAdd.textContent = "Add Calculator";
    buttonAdd.onclick = function () {
        addCalculator();
    }
    contentDiv.appendChild(buttonAdd);

    let buttonDelete: HTMLButtonElement = document.createElement("button");
    buttonDelete.textContent = "Remove Calculator";
    buttonDelete.className = "mb-3"
    buttonDelete.onclick = function () {
        removeCalculator();
    }
    buttonAdd.after(buttonDelete);
}

addDynamicButtons();
