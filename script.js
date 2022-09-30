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

const performOperationWithUIUpdate = ()=> {
    let ans = operate(lastOperator, Number(prevScreenValue), Number(screenValue));
    if(!isFinite(ans)) {
        allClearButtonClick();
        calculatorScreenElement.textContent = "Not a number";
    }
    else {
        screenValue = ans.toString();
        lastOperator = null;
        calculatorScreenElement.textContent = screenValue;
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
    calculatorScreenElement.textContent = screenValue;
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
    calculatorScreenElement.textContent = screenValue;
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
    calculatorScreenElement.textContent = screenValue;
    state = "FIRST_OPERAND_REQUESTED";
}

const dotButtonClick = ()=> {
    //Already have decimal point;
    if(!screenValue.includes('.')) {
        screenValue = screenValue+".";
        calculatorScreenElement.textContent = screenValue;
    }
}

const buttonClick = (event)=> {
    buttonTextContent = event.target.textContent;

    if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(buttonTextContent)) {
        numericButtonClick(Number(buttonTextContent));
    }
    else if(['/', '+', '-', 'x', '%'].includes(buttonTextContent)) {
        operatorButtonClick(buttonTextContent)
    }
    else if(buttonTextContent === '=') {
        equalButtonClick();
    }
    else if(buttonTextContent === 'C') {
        clearButtonClick();
    }
    else if(buttonTextContent === 'AC') {
        allClearButtonClick();
    }
    else if(buttonTextContent === '+/-') {
        console.log("+/-");
    }
    else if(buttonTextContent === '.') {
        dotButtonClick();
    }
    else {
        console.log("err");
    }
}

calculatorButtons.forEach(button => {
    button.addEventListener("click", buttonClick);
});



