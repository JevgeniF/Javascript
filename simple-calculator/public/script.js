'use strict';

class CalculatorBrain {
    calculateButtonClicked = false;
    lastNumberIsNegative = false;

    displayValue = 0;

    lastNumber = '';

    insertNumber(pressedNumberValue) {
        if (this.displayValue === 0) {
            this.displayValue = pressedNumberValue;
        } else {
            this.displayValue += pressedNumberValue;
        }
        this.lastNumber += pressedNumberValue;
        this.calculateButtonClicked = false
    }

    insertOperator(pressedOperatorValue) {
        if (!this.displayValue.toString().match(/^[+\-0-9]\d*(\.\d+)?$/)
            && this.displayValue.toString().charAt(this.displayValue.length - 1) !== ")") {
            console.log(this.displayValue);
            this.displayValue = this.displayValue.toString().slice(0, -1)
        }
        this.displayValue += pressedOperatorValue;
        this.lastNumber = '';
    }

    changeNumberToNegative() {
        if (this.lastNumber === '') {
            return;
        } else {
            this.lastNumber = 0 - this.lastNumber;
            this.lastNumberIsNegative = !this.lastNumberIsNegative;
        }
        if (this.lastNumberIsNegative) {
            if (this.displayValue.length - this.lastNumber.toString().length === -1) {
                this.displayValue = this.lastNumber
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length - 1))
                this.displayValue +="(" + this.lastNumber + ")"
            }
        }
        if(!this.lastNumberIsNegative) {
            if (this.displayValue.length - this.lastNumber.toString().length === 1) {
                this.displayValue = this.lastNumber
            } else {
                this.displayValue = this.displayValue.toString().slice(0, -(this.lastNumber.toString().length + 3))
                this.displayValue += this.lastNumber
            }
        }
    }

    numberWithDecimal() {
        if(this.lastNumberIsNegative) {
            return
        }
        if (this.displayValue === 0) {
            this.lastNumber = this.displayValue + "."
            this.displayValue = this.lastNumber
        } else {
            if (this.lastNumber.toString().match(/^[0-9.]+$/)) {
                this.lastNumber += ".";
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length - 1))
                this.displayValue += this.lastNumber;
            }
        }
        console.log(this.lastNumber)
    }

    evaluate() {
        if (eval(this.displayValue) === Infinity || isNaN(eval(this.displayValue))) {
            this.displayValue = "How dare you?"
        } else {
            this.displayValue = eval(this.displayValue)
            this.lastNumber = this.displayValue
        }
        this.calculateButtonClicked = true
        console.log(this.lastNumber)
    }

    clear() {
        this.displayValue = 0;
        this.lastNumber = ''
        this.calculateButtonClicked = false
        this.lastNumberIsNegative = false
    }
}

class CalculatorUI {

    numbers = []
    operators = []
    additionalParameters = []
    evaluationAndDeletion = []

    constructor(brain) {
        this.brain = brain;

        let displayInput = document.querySelector('#display-input');
        displayInput.value = brain.displayValue;

        let num0 = document.querySelector('#num0-button')
        let num1 = document.querySelector('#num1-button')
        let num2 = document.querySelector('#num2-button')
        let num3 = document.querySelector('#num3-button')
        let num4 = document.querySelector('#num4-button')
        let num5 = document.querySelector('#num5-button')
        let num6 = document.querySelector('#num6-button')
        let num7 = document.querySelector('#num7-button')
        let num8 = document.querySelector('#num8-button')
        let num9 = document.querySelector('#num9-button')

        this.numbers = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9]

        this.numbers.forEach(item => {
            item.onclick = this.numberClick; });

        let opsDiv = document.querySelector('#divide-button')
        let opsMulti = document.querySelector('#multiply-button')
        let opsMinus = document.querySelector('#minus-button')
        let opsPlus = document.querySelector('#plus-button')

        this.operators = [opsDiv, opsMulti, opsMinus, opsPlus]

        this.operators.forEach(item => {
            item.onclick = this.operatorClick; });

        let negativeButton = document.querySelector('#negative-button')
        let decimalButton = document.querySelector('#decimal-button')
        this.additionalParameters = [negativeButton, decimalButton]

        this.additionalParameters[0].onclick = this.negativeClick;
        this.additionalParameters[1].onclick = this.decimalClick;

        let calculateButton = document.querySelector('#calculate-button')
        let clearButton = document.querySelector('#clear-button')
        this.evaluationAndDeletion = [calculateButton, clearButton];

        this.evaluationAndDeletion[0].onclick = this.evaluateClick;
        this.evaluationAndDeletion[1].onclick = this.clearClick;
    }

    numberClick = (event) => {
        this.brain.insertNumber(event.target.innerHTML)
        this.update();
    }

    operatorClick = (event) => {
        this.brain.insertOperator(event.target.innerHTML)
        this.update();
    }

    negativeClick = () => {
        this.brain.changeNumberToNegative()
        this.update();
    }

    decimalClick = () => {
        this.brain.numberWithDecimal()
        this.update();
    }

    evaluateClick = () => {
        this.brain.evaluate()
        this.update();
    }

    clearClick = () => {
        this.brain.clear();
        this.update();
    }

    update() {
        let displayInput = document.querySelector('#display-input');
        displayInput.value = this.brain.displayValue;
    }
}

let brain = new CalculatorBrain();
let ui = new CalculatorUI(brain);

ui.update(brain);
