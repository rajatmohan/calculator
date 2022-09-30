let screenValue = "";
let prevScreenValue = "";
let lastOperator = null;
let state = "FIRST_OPERAND_REQUESTED";

const calculatorButtonContainer = document.querySelector(".calculator-buttons");
const calculatorButtons = calculatorButtonContainer.querySelectorAll("button");

const calculatorScreenElement = document.querySelector(".calculator-screen")

const add = (a, b) => {
    return a+b;
};

const subtract = (a, b) => {
    return a-b;
};

const multiply = (a, b) => {
    return a*b;
};

const divide = (a, b) => {
    return a/b;
};

const remainder = (a, b) => {
    return a%b;
}

const operate = (operator, a, b) => {
    a = Number(a)
    b = Number(b)
    if(isNaN(a) || isNaN(b)) {
        return null;
    }
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '%':
            return remainder(a, b);
        default:
            return null;
    }
}

const updateScreenValue = (value)=> {
    if(value.length > 13) {
        value = Number(screenValue).toExponential(6);
    }
    calculatorScreenElement.textContent = value;
}

const performOperationWithUIUpdate = ()=> {
    let ans = operate(lastOperator, Number(prevScreenValue), Number(screenValue));
    if(!isFinite(ans)) {
        allClearButtonClick();
        updateScreenValue("Not a number");
    }
    else {
        screenValue = ans.toString();
        lastOperator = null;
        updateScreenValue(screenValue);
    }
}

const numericButtonClick = (value)=> {
    if(state === "FIRST_OPERAND_REQUESTED") {
        screenValue = value.toString();
        state = "FIRST_OPERAND_STARTED";
    }
    else if(state === "FIRST_OPERAND_STARTED") {
        screenValue = screenValue + value.toString();
    }
    else if(state === "SECOND_OPERAND_REQUESTED") {
        screenValue = value.toString();
        state = "SECOND_OPERAND_STARTED";
    }
    else if(state === "SECOND_OPERAND_STARTED") {
        screenValue = ''+screenValue + value.toString();
    }
    updateScreenValue(screenValue);
}

const operatorButtonClick = (operator) => {
    if(state === "FIRST_OPERAND_REQUESTED" || state === "FIRST_OPERAND_STARTED") {
        prevScreenValue = screenValue;
        state = "SECOND_OPERAND_REQUESTED";
    }
    else if(state === "SECOND_OPERAND_STARTED") {
        performOperationWithUIUpdate();
        prevScreenValue = screenValue;
        state = "SECOND_OPERAND_REQUESTED";
    }
    lastOperator = operator;
}

const equalButtonClick = ()=> {
    if(lastOperator != null) {
        performOperationWithUIUpdate();
        state = "FIRST_OPERAND_REQUESTED";
    }
}

const clearButtonClick = ()=> {
    screenValue = "";
    updateScreenValue(screenValue);
    if(state === "FIRST_OPERAND_STARTED"){
        state = "FIRST_OPERAND_REQUESTED";
    }
    else if(state === "SECOND_OPERAND_STARTED") {
        state = "SECOND_OPERAND_REQUESTED";
    }
}

const allClearButtonClick = ()=> {
    screenValue = "";
    prevScreenValue = "";
    lastOperator = null;
    updateScreenValue(screenValue);
    state = "FIRST_OPERAND_REQUESTED";
}

const dotButtonClick = ()=> {
    //Already have decimal point;
    if(!screenValue.includes('.')) {
        screenValue = screenValue+".";
        updateScreenValue(screenValue);
    }
}

const toggleSign = ()=> {
    let operand = Number(screenValue);
    screenValue = (-operand).toString();
    updateScreenValue(screenValue);
}

const handleButtonAndKeyPress = (symbol)=> {
    if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(symbol)) {
        numericButtonClick(Number(symbol));
    }
    else if(['/', '+', '-', 'x', '%'].includes(symbol)) {
        operatorButtonClick(symbol)
    }
    else if(symbol === '=') {
        equalButtonClick();
    }
    else if(symbol === 'C') {
        clearButtonClick();
    }
    else if(symbol === 'AC') {
        allClearButtonClick();
    }
    else if(symbol === '+/-') {
        toggleSign();
    }
    else if(symbol === '.') {
        dotButtonClick();
    }
    else {
        console.log("err");
    }
}
const buttonClick = (event)=> {
    buttonTextContent = event.target.textContent;
    handleButtonAndKeyPress(buttonTextContent);
}

calculatorButtons.forEach(button => {
    button.addEventListener("click", buttonClick);
});

document.addEventListener('keypress', (event) => {
    let keySymbol = event.key;
    // key a is used as All Clear operation.
    if(keySymbol === 'a' || keySymbol === 'A') {
        keySymbol = 'AC';
    }
    else if(keySymbol === '*' || keySymbol === 'x' || keySymbol === 'X') {
        keySymbol = 'x';
    }
    // key c is used for clear operation.
    else if(keySymbol === 'c' || keySymbol === 'C') {
        keySymbol = 'C';
    }
    // key t is usef to toggle current screen value.
    else if(keySymbol === "t" || keySymbol == "T") {
        keySymbol = '+/-';
    }
    handleButtonAndKeyPress(keySymbol);
}, false);





