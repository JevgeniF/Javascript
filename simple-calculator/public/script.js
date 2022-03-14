'use strict';


class CalculatorBrain {
    calculateButtonClicked = false;
    lastNumberIsNegative = false;

    displayValue = '0';

    lastNumber = '';

    insertNumber(pressedNumberValue) {
        if (this.displayValue === '0') {
            this.displayValue = pressedNumberValue;
        } else {
            this.displayValue += pressedNumberValue;
        }
        this.lastNumber += pressedNumberValue;
        console.log(this.lastNumber)
        this.calculateButtonClicked = false
    }

    insertOperator(pressedOperatorValue) {
        if (isNaN(this.displayValue.charAt(this.displayValue.length - 1))) {
            this.displayValue = this.displayValue.slice(0, -1)
        }
        this.displayValue += pressedOperatorValue;
        lastNumber = '';
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
                this.displayValue = this.lastNumber.toString()
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length - 1))
                this.displayValue +="(" + this.lastNumber + ")"
            }
        }
        if(!this.lastNumberIsNegative) {
            if (this.displayValue.length - this.lastNumber.toString().length === 1) {
                this.displayValue = this.lastNumber.toString()
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length + 3))
                this.displayValue += this.lastNumber.toString()
            }
        }
    }
}

class CalculatorUI {

    numbers = []
    operators = []
    additionalParameters = []

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
        this.additionalParameters = [negativeButton]

        this.additionalParameters.forEach(item => {
            item.onclick = this.addParamClick; });
    }

    numberClick = (event) => {
        this.brain.insertNumber(event.target.innerHTML)
        console.log(event.target.innerHTML);
    }

    operatorClick = (event) => {
        this.brain.insertOperator(event.target.innerHTML)
        console.log(event.target.innerHTML);
    }

    addParamClick = (event) => {
        this.brain.changeNumberToNegative()
        console.log(event.target.id);
    }

}
let calculateButtonClicked = false
let lastNumberIsNegative = false

let lastNumber = ''

//numbers command
//operators command
//negative command

let decimalButton = document.querySelector('#decimal-button')

//decimal command
decimalButton.onclick = () => {
    if(lastNumberIsNegative) {
        return
    }
    if (displayInput.value === '0') {
        lastNumber = 0 + decimalButton.textContent
        displayInput.value = lastNumber
    } else {
        if (lastNumber.toString().match(/^[0-9]+$/)) {
            lastNumber += decimalButton.textContent;
            displayInput.value = displayInput.value.slice(0, -(lastNumber.toString().length - 1))
            displayInput.value += lastNumber;
        }
    }
    console.log(lastNumber)
}

let calculateButton = document.querySelector('#calculate-button')

//calculate command
calculateButton.onclick = () => {
    // if division by 0 or 0/0
    if (eval(displayInput.value) === Infinity || isNaN(eval(displayInput.value))) {
        displayInput.value = "How dare you?"
    } else {
        displayInput.value = eval(displayInput.value)
        lastNumber = displayInput.value
    }
    calculateButtonClicked = true
}

let clearButton = document.querySelector('#clear-button')

//clear command
clearButton.onclick = () => {
    displayInput.value = 0;
    lastNumber = ''
    calculateButtonClicked = false
    lastNumberIsNegative = false
}

let brain = new CalculatorBrain();
let ui = new CalculatorUI(brain);
