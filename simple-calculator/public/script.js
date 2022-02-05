'use strict';

let calculateButtonClicked = false
let lastNumberIsNegative = false

let lastNumber = ''

let displayInput = document.querySelector('#display-input')
displayInput.value = 0;

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

let numbers = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9]

//numbers command
numbers.forEach(item => {
    item.onclick = () => {
        if (displayInput.value === '0' || calculateButtonClicked) {
            displayInput.value = item.textContent;
        } else {
            displayInput.value += item.textContent;
        }
        lastNumber += item.textContent;
        console.log(lastNumber)
        calculateButtonClicked = false
    }
})

let opsDiv = document.querySelector('#divide-button')
let opsMulti = document.querySelector('#multiply-button')
let opsMinus = document.querySelector('#minus-button')
let opsPlus = document.querySelector('#plus-button')

let operands = [opsDiv, opsMulti, opsMinus, opsPlus]

//operands command
operands.forEach(item => {
    item.onclick = () => {
        if (isNaN(displayInput.value.charAt(displayInput.value.length - 1))) {
            displayInput.value = displayInput.value.slice(0, -1)
        }
        displayInput.value += item.textContent;
        lastNumber = '';
    }
})

let negativeButton = document.querySelector('#negative-button')

//negative command
negativeButton.onclick = () => {
    if (lastNumber === '') {
        return;
    } else {
        lastNumber = 0 - lastNumber;
        lastNumberIsNegative = !lastNumberIsNegative;
    }
    console.log(lastNumberIsNegative)

    if (lastNumberIsNegative) {
        if (displayInput.value.length - lastNumber.toString().length === -1) {
            displayInput.value = lastNumber
        } else {
            displayInput.value = displayInput.value.slice(0, -(lastNumber.toString().length - 1))
            displayInput.value +="(" + lastNumber + ")"
        }
    }

    if(!lastNumberIsNegative) {
        if (displayInput.value.length - lastNumber.toString().length === 1) {
            displayInput.value = lastNumber
        } else {
            displayInput.value = displayInput.value.slice(0, -(lastNumber.toString().length + 3))
            displayInput.value += lastNumber
        }
    }
}

let decimalButton = document.querySelector('#decimal-button')

//decimal command
decimalButton.onclick = () => {
    let lastNumber = findLastNumber(displayInput.value);
    if (lastNumber.match(/^[0-9]+$/) ) {
        lastNumber += decimalButton.textContent;

        if (findLastOperandIndex(displayInput.value) !== 0) {
            displayInput.value = displayInput.value.slice(0, findLastOperandIndex(displayInput.value) + 1)
            displayInput.value += lastNumber;
        } else {
            displayInput.value = lastNumber;
        }
    }
}

let calculateButton = document.querySelector('#calculate-button')

//calculate command
calculateButton.onclick = () => {
    // if division by 0 or 0/0
    if (eval(displayInput.value) === Infinity || isNaN(eval(displayInput.value))) {
        displayInput.value = "How dare you?"
    } else {
        displayInput.value = eval(displayInput.value)
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

