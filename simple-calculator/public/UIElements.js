export default class UIElements {

    constructor() {}

    contentDiv() {
        let div = document.createElement("div");
        div.id = "content";
        div.className = "d-grid align-items-center justify-content-center";
        document.body.prepend(div);
        return div;
    }

    calculatorDiv(calculatorCount) {
        let calculatorDiv = document.createElement("div");
        //calculatorDiv.id = "calculator-" + count;
        calculatorDiv.className = "calculator-" + calculatorCount +
            " d-flex min-vw-25 max-vw-50 flex-column mb-3 position-relative align-items-center py-4 rounded-3 shadow bg-secondary bg-gradient bg-opacity-75";
        return calculatorDiv;
    }

    displayInput(calculatorCount) {
        let input = document.createElement("input");
        input.className = "calculator-" + calculatorCount + " display-input" +
            " text-end position-relative w-75 h-25 p-3 m-3 h2 rounded-3 bg-light shadow-inset"
        return input;
    }

    buttonRowDiv(rowCount, calculatorCount) {
        let div = document.createElement("div");
        div.className = "calculator-" + calculatorCount + " button-row-div-" + rowCount +
            " d-flex flex-row position-relative align-items-center justify-content-center m-1 w-100"
        return div;
    }

    button(id, value, backgroundColor, textColor, calculatorCount) {
        let button = document.createElement("button");
        button.className = "calculator-" + calculatorCount + " button-" + id +
            " rounded-3 mx-2 shadow-lg shadow-inset h2 " + backgroundColor + " " + textColor;
        button.style.height = "55px";
        button.style.width = "55px";
        button.innerHTML = value;
        return button;
    }

    evalButton(id, value, calculatorCount) {
        let button = document.createElement("button");
        button.className = "calculator-" + calculatorCount + " button-" + id +
            " calculate-button rounded-3 mx-2 shadow-lg shadow-inset h2 bg-info bg-opacity-25 text-white";
        button.style.height = "55px";
        button.style.width = "125px"
        button.innerHTML = value;
        return button;
    }
}
