export default class CalculatorBrain {
    calculateButtonClicked = false;
    lastNumberIsNegative = false;

    displayValue = 0;

    lastNumber = '';

    insertNumber(pressedNumberValue) {
        if (this.displayValue === 0 || this.displayValue.toString() === '') {
            this.displayValue = pressedNumberValue;
        } else {
            this.displayValue += pressedNumberValue;
        }
        this.lastNumber += pressedNumberValue;
        this.calculateButtonClicked = false;
    }

    insertOperator(pressedOperatorValue) {
        if (this.displayValue.toString().charAt(this.displayValue.length - 1).match(/^[+\-*\/]?$/)) {
            this.displayValue = this.displayValue.toString().slice(0, -1);
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
                this.displayValue = this.lastNumber;
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length - 1));
                this.displayValue +="(" + this.lastNumber + ")";
            }
        }
        if(!this.lastNumberIsNegative) {
            if (this.displayValue.length - this.lastNumber.toString().length === 1) {
                this.displayValue = this.lastNumber;
            } else {
                this.displayValue = this.displayValue.toString().slice(0, -(this.lastNumber.toString().length + 3));
                this.displayValue += this.lastNumber;
            }
        }
    }

    numberWithDecimal() {
        if(this.lastNumberIsNegative) {
            return;
        }
        if (this.displayValue === 0) {
            this.lastNumber = this.displayValue + ".";
            this.displayValue = this.lastNumber;
        } else {
            if (this.lastNumber.toString().match(/^[0-9.]+$/)) {
                this.lastNumber += ".";
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.toString().length - 1));
                this.displayValue += this.lastNumber;
            }
        }
    }

    evaluate() {
        if (this.displayValue.toString().charAt(this.displayValue.length - 1).match(/^[+\-*\/]?$/)) {
            this.displayValue = this.displayValue.slice(0, -1);
        }
        if (eval(this.displayValue.toString()) === Infinity || isNaN(eval(this.displayValue.toString()))) {
            this.displayValue = "How dare you?";
        } else {
            this.displayValue = eval(this.displayValue.toString());
            this.lastNumber = this.displayValue;
        }
        this.calculateButtonClicked = true;
        console.log(this.lastNumber);
    }

    deleteOneCharacter() {
        this.displayValue = this.displayValue.slice(0, -1);
        if (this.displayValue.toString().length === 0) {
            this.displayValue = '0';
        }
    }

    clear() {
        this.displayValue = 0;
        this.lastNumber = '';
        this.calculateButtonClicked = false;
        this.lastNumberIsNegative = false;
    }
}
