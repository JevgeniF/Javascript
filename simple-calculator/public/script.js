import CalculatorBrain from "./CalculatorBrain.js";
import CalculatorUI from "./CalculatorUI.js";
import UIElements from "./UIElements.js";

let uiElements = new UIElements();
let calculatorUIs = [];

let calculatorCount = -1
let contentDiv = uiElements.contentDiv();
document.body.prepend(contentDiv)

function addCalculator() {
    calculatorCount++;
    let calculatorDiv = uiElements.calculatorDiv(calculatorCount);

    let displayInput = uiElements.displayInput(calculatorCount);
    calculatorDiv.appendChild(displayInput);
    let buttonRows = createButtonRows();

    addNumButtonsToRow(buttonRows[0], 7, 9);
    addNumButtonsToRow(buttonRows[1], 4, 6);
    addNumButtonsToRow(buttonRows[2], 1, 3);

    let negativeButton =
        uiElements.button("negative", "+/-", "bg-secondary", "text-white", calculatorCount);
    let decimalButton =
        uiElements.button("decimal", ".", "bg-secondary", "text-white", calculatorCount);
    buttonRows[3].appendChild(negativeButton);
    addNumButtonsToRow(buttonRows[3], 0, 0);
    buttonRows[3].appendChild(decimalButton);

    let divideButton =
        uiElements.button("divide", "/", "bg-warning", "text-white", calculatorCount);
    let multiplyButton =
        uiElements.button("multiply", "*", "bg-warning", "text-white", calculatorCount);
    let minusButton =
        uiElements.button("minus", "-", "bg-warning", "text-white", calculatorCount);
    let plusButton =
        uiElements.button("plus", "+", "bg-warning", "text-white", calculatorCount);

    buttonRows[0].appendChild(divideButton);
    buttonRows[1].appendChild(multiplyButton);
    buttonRows[2].appendChild(minusButton);
    buttonRows[3].appendChild(plusButton);

    let evalButton = uiElements.evalButton("calculate", "=", calculatorCount);
    let backspaceButton =
        uiElements.button("backspace", "C", "bg-danger", "text-white", calculatorCount);
    let clearButton =
        uiElements.button("clear", "AC", "bg-danger", "text-white", calculatorCount);

    buttonRows[4].appendChild(evalButton);
    buttonRows[4].appendChild(backspaceButton);
    buttonRows[4].appendChild(clearButton);

    for (let i = 0; i < buttonRows.length; i++) {
        calculatorDiv.appendChild(buttonRows[i]);
    }
    contentDiv.appendChild(calculatorDiv);

    let ui = new CalculatorUI(new CalculatorBrain(), calculatorCount);
    ui.update();
    calculatorUIs.push(ui);
}

function createButtonRows() {
    let buttonRows = [];
    for (let i = 0; i < 5; i++) {
        let buttonRowDiv = uiElements.buttonRowDiv(i, calculatorCount);
        buttonRows.push(buttonRowDiv);
    }
    return buttonRows;
}

function addNumButtonsToRow(row, startNumber, endNumber) {
    for (let i = startNumber; i < endNumber + 1; i++) {
        let numButton = uiElements.button(i, i, "bg-white", "text-black", calculatorCount)
        row.appendChild(numButton);
    }
}

function removeCalculator() {
    if (calculatorCount < 0) return;
    let calculator = contentDiv.querySelector(".calculator-" + calculatorCount)
    if (calculator !== null) {
        calculator.remove();
    }

    calculatorCount--;
    calculatorUIs.pop();
}

function addDynamicButtons() {
    let buttonAdd = document.createElement("button");
    buttonAdd.textContent = "Add Calculator";
    buttonAdd.onclick = function() {
        addCalculator();
    }
    contentDiv.appendChild(buttonAdd);

    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Remove Calculator";
    buttonDelete.className ="mb-3"
    buttonDelete.onclick = function() {
        removeCalculator();
    }
    buttonAdd.after(buttonDelete);
}

addDynamicButtons();
