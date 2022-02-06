# Simple calculator with Bootstrap

## Description

HTML version of calculator with simpliest operations: `+, -, *, /`  
Script is written in JS  
The calculator takes 2 numbers, operator and returns answer just like usual real calulator.

## How to run

Clone the code and run `npm install`  
Start as webpack server with command `npx webpack serve --mode <value>`  
`<value>` defines the mode to pass to webpack, i.e. `development`

Open your favorite browser and navigate to `http://localhost:8080/`  

## Some usage instructions

The `+/-` button - change to negative number value, must be used after completion of number input.  
Example: to get the number `-1.23` press `1`, `.`, `2`, `3` and then `+/-`
The possibility to add decimal or numbers after decimal for negative number value is locked, you have to switch number
value back to positive, make changes, and press `+/-` again.  

If you see `How dare you?` message, then you have to repeat math rule regarding division by zero.

***
*Important! The work of calculator was not checked in every browser.  
Chrome was used during development*


