export default class CalculatorUI {

    numbers = [];
    operators = [];
    additionalParameters = [];
    evaluationAndDeletion = [];

    constructor(brain, calculatorNo) {
        this.brain = brain;
        this.calculatorNo = calculatorNo;

        let displayInput = document.querySelector(`.calculator-${this.calculatorNo}.display-input`)
        displayInput.value = brain.displayValue;

        let num0 = document.querySelector(`.calculator-${this.calculatorNo}.button-0`);
        let num1 = document.querySelector(`.calculator-${this.calculatorNo}.button-1`);
        let num2 = document.querySelector(`.calculator-${this.calculatorNo}.button-2`);
        let num3 = document.querySelector(`.calculator-${this.calculatorNo}.button-3`);
        let num4 = document.querySelector(`.calculator-${this.calculatorNo}.button-4`);
        let num5 = document.querySelector(`.calculator-${this.calculatorNo}.button-5`);
        let num6 = document.querySelector(`.calculator-${this.calculatorNo}.button-6`);
        let num7 = document.querySelector(`.calculator-${this.calculatorNo}.button-7`);
        let num8 = document.querySelector(`.calculator-${this.calculatorNo}.button-8`);
        let num9 = document.querySelector(`.calculator-${this.calculatorNo}.button-9`);

        this.numbers = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];

        this.numbers.forEach(item => {
            item.onclick = this.numberClick; });

        let opsDiv = document.querySelector(`.calculator-${this.calculatorNo}.button-divide`);
        let opsMulti = document.querySelector(`.calculator-${this.calculatorNo}.button-multiply`);
        let opsMinus = document.querySelector(`.calculator-${this.calculatorNo}.button-minus`);
        let opsPlus = document.querySelector(`.calculator-${this.calculatorNo}.button-plus`);

        this.operators = [opsDiv, opsMulti, opsMinus, opsPlus];

        this.operators.forEach(item => {
            item.onclick = this.operatorClick; });

        let negativeButton = document.querySelector(`.calculator-${this.calculatorNo}.button-negative`);
        let decimalButton = document.querySelector(`.calculator-${this.calculatorNo}.button-decimal`);
        this.additionalParameters = [negativeButton, decimalButton];

        this.additionalParameters[0].onclick = this.negativeClick;
        this.additionalParameters[1].onclick = this.decimalClick;

        let calculateButton = document.querySelector(`.calculator-${this.calculatorNo}.button-calculate`);
        let backspaceButton = document.querySelector(`.calculator-${this.calculatorNo}.button-backspace`);
        let clearButton = document.querySelector(`.calculator-${this.calculatorNo}.button-clear`);
        this.evaluationAndDeletion = [calculateButton, backspaceButton, clearButton];

        this.evaluationAndDeletion[0].onclick = this.evaluateClick;
        this.evaluationAndDeletion[1].onclick = this.backspaceClick;
        this.evaluationAndDeletion[2].onclick = this.clearClick;
    }

    numberClick = (event) => {
        this.brain.insertNumber(event.target.innerHTML)
        this.update();
    }

    operatorClick = (event) => {
        this.brain.insertOperator(event.target.innerHTML);
        this.update();
    }

    negativeClick = () => {
        this.brain.changeNumberToNegative();
        this.update();
    }

    decimalClick = () => {
        this.brain.numberWithDecimal();
        this.update();
    }

    evaluateClick = () => {
        this.brain.evaluate();
        this.update();
    }

    backspaceClick = () => {
        this.brain.deleteOneCharacter();
        this.update();
    }

    clearClick = () => {
        this.brain.clear();
        this.update();
    }

    update() {
        let displayInput = document.querySelector(`.calculator-${this.calculatorNo}.display-input`)
        displayInput.value = this.brain.displayValue;
    }
}
