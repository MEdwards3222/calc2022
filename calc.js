let calcContainer = document.querySelector('.calculator');
let calcDisplay = document.querySelector('#display');
let displayTotal = " ";
let runningTotal = 0;
let temp = 0;
let btn = document.querySelector('.Buttons');
let decimalFlag = false;
let currentOperation = null;
let resetScreen = false;
let firstOperand = '';
let secondOperand = '';


let numBtn = document.querySelectorAll('[data-number]');
let operatorBtn = document.querySelectorAll('[data-operator]');


let clearBtn = document.getElementById('clearButton');
let eraseBtn = document.getElementById('eraseButton');
let addBtn = document.getElementById('additionButton');
let subBtn = document.getElementById('subtractionButton');
let mulBtn = document.getElementById('multiplicationButton');
let divBtn = document.getElementById('divisionButton');
let eqlBtn = document.getElementById('executeButton');
let decBtn = document.getElementById('decimalButton');
let prevEquation = document.getElementById('prevEquation');

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch(operator) {
        case "+":
            return add(num1, num2);
            
        
        case "-":
            return subtract(num1, num2);
            
        
        case "X":
            return multiply(num1, num2);
            

        case "/":
            if (num2 === 0)
                return null;

            else return divide(num1, num2);

        default:
            return calcDisplay.textContent = "Error!";
            
    }
}

function clearScreen() {
    calcDisplay.textContent = '';
    resetScreen = false;
}

function clear() {
    calcDisplay.textContent = '0';
    prevEquation.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}


function roundNum(num) {
    return Math.round(num * 1000) / 1000;
}

function displayValue(result) {
    calcDisplay.textContent = result;
}

function readyOperation(operator) {
    if (currentOperation !== null)
        evaluate();

    firstOperand = calcDisplay.textContent;
    currentOperation = operator;
    prevEquation.textContent = `${firstOperand} ${currentOperation}`;
    resetScreen = true;
}

function evaluate() {
    if(currentOperation === null || resetScreen) 
        return;
    if (currentOperation === '/' && calcDisplay.textContent === '0'){
        alert("You can't divide by 0!");
        return;
    }

    secondOperand = calcDisplay.textContent;
    calcDisplay.textContent = roundNum(operate(currentOperation, firstOperand, secondOperand));
    prevEquation.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
    currentOperation = null;
}

function appendNumber(number) {
    if(calcDisplay.textContent === '0' || resetScreen)
        clearScreen();
    calcDisplay.textContent += number;
}

function appendPoint() {
    if(resetScreen)
        clearScreen();
    
    if(calcDisplay.textContent === '')
        calcDisplay.textContent = "0";
    
    if(calcDisplay.textContent.includes("."))
        return;
    
    calcDisplay.textContent += ".";
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9)
        appendNumber(e.key);
    if(e.key === ".")
        appendPoint();
    if(e.key === "=" || e.key === "Enter")
        evaluate();
    if(e.key === "Backspace")
        deleteNumber();
    if(e.key === "Escape")
        clear();
    if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
        readyOperation(convertOperator(e.key));
}

function deleteNumber() {
    calcDisplay.textContent = calcDisplay.textContent
    .toString()
    .slice(0, -1)
}

function convertOperator(keyboardOperator) {
    if(keyboardOperator === "+")
        return "+";

    if(keyboardOperator === "-")
        return "-";
    
    if(keyboardOperator === "/")
        return "/";

    if(keyboardOperator === "*")
        return "X";
}

//===================Event Listeners=====================
window.addEventListener('keydown', handleKeyboardInput);

clearBtn.addEventListener("click", () => clear());

eraseBtn.addEventListener("click", deleteNumber);

numBtn.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorBtn.forEach((button) => 
    button.addEventListener('click', () => readyOperation(button.textContent))
)

eqlBtn.addEventListener('click', evaluate);


decBtn.addEventListener("click", appendPoint);


//===================Event Listeners=====================