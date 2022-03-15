

import CalculatorBrain from "./CalculatorBrain.js";
import CalculatorUI from "./CalculatorUI.js";

let brain = new CalculatorBrain();
let ui = new CalculatorUI(brain);

ui.update(brain);
