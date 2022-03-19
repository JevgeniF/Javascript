import CalculatorBrain from "./CalculatorBrain";

export default class CalculatorUI {

    numbers: HTMLButtonElement[] = [];
    operators: HTMLButtonElement[] = [];
    additionalParameters: HTMLButtonElement[] = [];
    evaluationAndDeletion: HTMLButtonElement[] = [];

    constructor(private brain: CalculatorBrain, private calculatorNo: number) {

        let displayInput =
            document.querySelector(`.calculator-${this.calculatorNo}.display-input`) as HTMLInputElement;
        displayInput.value = brain.displayValue;

        for (let i = 0; i < 10; i++) {
            let num =
                document.querySelector(`.calculator-${this.calculatorNo}.button-${i}`) as HTMLButtonElement;
            this.numbers.push(num);
        }
        this.numbers.forEach(item => {
            item.onclick = this.numberClick;
        });

        let opsDiv =
            document.querySelector(`.calculator-${this.calculatorNo}.button-divide`) as HTMLButtonElement;
        let opsMulti =
            document.querySelector(`.calculator-${this.calculatorNo}.button-multiply`) as HTMLButtonElement;
        let opsMinus =
            document.querySelector(`.calculator-${this.calculatorNo}.button-minus`) as HTMLButtonElement;
        let opsPlus =
            document.querySelector(`.calculator-${this.calculatorNo}.button-plus`) as HTMLButtonElement;

        this.operators = [opsDiv, opsMulti, opsMinus, opsPlus];
        this.operators.forEach(item => {
            item.onclick = this.operatorClick;
        });

        let negativeButton =
            document.querySelector(`.calculator-${this.calculatorNo}.button-negative`) as HTMLButtonElement;
        let decimalButton =
            document.querySelector(`.calculator-${this.calculatorNo}.button-decimal`) as HTMLButtonElement;

        this.additionalParameters = [negativeButton, decimalButton];
        this.additionalParameters[0].onclick = this.negativeClick;
        this.additionalParameters[1].onclick = this.decimalClick;

        let calculateButton =
            document.querySelector(`.calculator-${this.calculatorNo}.button-calculate`) as HTMLButtonElement;
        let backspaceButton =
            document.querySelector(`.calculator-${this.calculatorNo}.button-backspace`) as HTMLButtonElement;
        let clearButton =
            document.querySelector(`.calculator-${this.calculatorNo}.button-clear`) as HTMLButtonElement;

        this.evaluationAndDeletion = [calculateButton, backspaceButton, clearButton];
        this.evaluationAndDeletion[0].onclick = this.evaluateClick;
        this.evaluationAndDeletion[1].onclick = this.backspaceClick;
        this.evaluationAndDeletion[2].onclick = this.clearClick;
    }

    numberClick = (event: Event): void => {
        this.brain.insertNumber((event.target! as HTMLButtonElement).innerHTML)
        this.update();
    }

    operatorClick = (event: Event): void => {
        this.brain.insertOperator((event.target! as HTMLButtonElement).innerHTML);
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
        let displayInput =
            document.querySelector(`.calculator-${this.calculatorNo}.display-input`) as HTMLInputElement
        displayInput!.value = this.brain.displayValue;
    }
}
