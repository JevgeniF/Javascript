import CalculatorBrain from "./CalculatorBrain";

export default class CalculatorUI {

    numbers: HTMLButtonElement[] = [];
    operators: HTMLButtonElement[] = [];
    additionalParameters: HTMLButtonElement[] = [];
    evaluationAndDeletion: HTMLButtonElement[] = [];

    constructor(private brain: CalculatorBrain, private calculatorNo: number) {

        let displayInput: HTMLInputElement =
            document.querySelector(`.calculator-${this.calculatorNo}.display-input`)!;
        displayInput.value = brain.displayValue;

        for (let i = 0; i < 10; i++) {
            let num: HTMLButtonElement =
                document.querySelector(`.calculator-${this.calculatorNo}.button-${i}`)!;
            this.numbers.push(num);
        }
        this.numbers.forEach(item => {
            item.onclick = this.numberClick;
        });

        let opsDiv: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-divide`)!;
        let opsMulti: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-multiply`)!;
        let opsMinus: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-minus`)!;
        let opsPlus: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-plus`)!;

        this.operators = [opsDiv, opsMulti, opsMinus, opsPlus];
        this.operators.forEach(item => {
            item.onclick = this.operatorClick;
        });

        let negativeButton: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-negative`)!;
        let decimalButton: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-decimal`)!;

        this.additionalParameters = [negativeButton, decimalButton];
        this.additionalParameters[0].onclick = this.negativeClick;
        this.additionalParameters[1].onclick = this.decimalClick;

        let calculateButton: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-calculate`)!;
        let backspaceButton: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-backspace`)!;
        let clearButton: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.button-clear`)!;

        this.evaluationAndDeletion = [calculateButton, backspaceButton, clearButton];
        this.evaluationAndDeletion[0].onclick = this.evaluateClick;
        this.evaluationAndDeletion[1].onclick = this.backspaceClick;
        this.evaluationAndDeletion[2].onclick = this.clearClick;
    }

    numberClick = (event: Event): void => {
        if (event.target instanceof HTMLButtonElement) {
            this.brain.insertNumber(event.target.innerHTML);
        }
        this.update();
    }

    operatorClick = (event: Event): void => {
        if (event.target instanceof HTMLButtonElement) {
            this.brain.insertOperator(event.target.innerHTML);
        }
        this.update();
    }

    negativeClick = (): void => {
        this.brain.changeNumberToNegative();
        this.update();
    }

    decimalClick = (): void => {
        this.brain.numberWithDecimal();
        this.update();
    }

    evaluateClick = (): void => {
        this.brain.evaluate();
        this.update();
    }

    backspaceClick = (): void => {
        this.brain.deleteOneCharacter();
        this.update();
    }

    clearClick = (): void => {
        this.brain.clear();
        this.update();
    }

    update(): void {
        let displayInput: HTMLButtonElement =
            document.querySelector(`.calculator-${this.calculatorNo}.display-input`)!;
        displayInput!.value = this.brain.displayValue;
    }
}
