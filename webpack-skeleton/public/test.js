'use strict';

//find element from the page html, via element id - use # sign in from of id
let button = document.querySelector('#button-calculate')
let number1 = document.querySelector('#number1')

function showNumber() {
    //use console.dir to inspect html element
    console.dir(number1)
    console.log(number1.valueAsNumber)
}

button.onclick = (event) => {
    showNumber();
}
