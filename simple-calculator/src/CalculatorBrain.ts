export default class CalculatorBrain {
    calculateButtonClicked = false;
    lastNumberIsNegative = false;

    displayValue: string = '0';

    lastNumber: string = '';

    insertNumber(pressedNumberValue: string): void {
        if (this.displayValue === '0' || this.displayValue === '') {
            this.displayValue = pressedNumberValue;
        } else {
            this.displayValue += pressedNumberValue;
        }
        this.lastNumber += pressedNumberValue;
        this.calculateButtonClicked = false;
    }

    insertOperator(pressedOperatorValue: string): void {
        if (this.displayValue.charAt(this.displayValue.length - 1).match(/^[+\-*\/]?$/)) {
            this.displayValue = this.displayValue.slice(0, -1);
        }
        this.displayValue += pressedOperatorValue;
        this.lastNumber = '';
        this.lastNumberIsNegative = false;
    }

    changeNumberToNegative(): void {
        if (this.lastNumber === '') {
            return;
        } else {
            this.lastNumberIsNegative = !this.lastNumberIsNegative;
        }
        if (this.lastNumberIsNegative) {
            this.lastNumber = '-' + this.lastNumber;
            if (this.displayValue.length - this.lastNumber.toString().length === -1) {
                this.displayValue = this.lastNumber;
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.length - 1));
                this.displayValue += "(" + this.lastNumber + ")";
            }
        }
        if (!this.lastNumberIsNegative) {
            this.lastNumber = this.lastNumber.slice(1)
            if (this.displayValue.length - this.lastNumber.length === 1) {
                this.displayValue = this.lastNumber;
            } else {
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.length + 3));
                this.displayValue += this.lastNumber;
            }
        }
    }

    numberWithDecimal(): void {
        if (this.lastNumberIsNegative) {
            return;
        }
        if (this.displayValue === '0') {
            this.lastNumber = this.displayValue + ".";
            this.displayValue = this.lastNumber;
        } else {
            if (this.lastNumber.match(/^[0-9.]+$/)) {
                this.lastNumber += ".";
                this.displayValue = this.displayValue.slice(0, -(this.lastNumber.length - 1));
                this.displayValue += this.lastNumber;
            }
        }
    }

    evaluate(): void {
        if (this.displayValue.charAt(this.displayValue.length - 1).match(/^[+\-*\/]?$/)) {
            this.displayValue = this.displayValue.slice(0, -1);
        }
        if (eval(this.displayValue) === Infinity || isNaN(eval(this.displayValue))) {
            this.displayValue = "How dare you?";
        } else {
            this.displayValue = eval(this.displayValue);
            this.lastNumber = this.displayValue;
        }
        this.calculateButtonClicked = true;
        console.log(this.lastNumber);
    }

    deleteOneCharacter(): void {
        this.displayValue = this.displayValue.slice(0, -1);
        if (this.displayValue.length === 0) {
            this.displayValue = '0';
        }
    }

    clear(): void {
        this.displayValue = '0';
        this.lastNumber = '';
        this.calculateButtonClicked = false;
        this.lastNumberIsNegative = false;
    }
}
