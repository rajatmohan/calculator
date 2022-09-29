let screenValue = 0;
let prevScreenValue = 0;
let lastOperator = null;

let state = "FIRST_OPERAND_REQUESTED";

const calculatorButtonContainer = document.querySelector(".calculator-buttons");
const calculatorButtons = calculatorButtonContainer.querySelectorAll("button");

const calculatorScreenElement = document.querySelector(".calculator-screen")

console.log(calculatorScreenElement)


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
    let ans = operate(lastOperator, prevScreenValue, screenValue);
    screenValue = ans;
    calculatorScreenElement.textContent = screenValue;
    lastOperator = null;
}

const numericButtonClick = (value)=> {
    if(state === "FIRST_OPERAND_REQUESTED") {
        screenValue = value;
        state = "FIRST_OPERAND_STARTED";
    }
    else if(state === "FIRST_OPERAND_STARTED") {
        screenValue = screenValue*10 + value;
    }
    else if(state === "SECOND_OPERAND_REQUESTED") {
        prevScreenValue = screenValue;
        screenValue = value;
        state = "SECOND_OPERAND_STARTED";
    }
    else if(state === "SECOND_OPERAND_STARTED") {
        screenValue = screenValue*10 + value;
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
        console.log("c");
    }
    else if(buttonTextContent === 'AC') {
        console.log("ac");
    }
    else if(buttonTextContent === '+/-') {
        console.log("+/-");
    }
    else if(buttonTextContent === '.') {
        console.log(".");
    }
    else {
        console.log("err");
    }
}

calculatorButtons.forEach(button => {
    button.addEventListener("click", buttonClick);
});



