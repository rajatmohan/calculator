let screenValue = "";

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
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

const numericButtonClick = (value)=> {
    screenValue = screenValue + value;
    calculatorScreenElement.textContent = screenValue;
}

const buttonClick = (event)=> {
    buttonTextContent = event.target.textContent;
    console.log(buttonTextContent)
    if(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(buttonTextContent)) {
        numericButtonClick(Number(buttonTextContent));
    }
    else if(['/', '+', '-', 'x', '%'].includes(buttonTextContent)) {
        console.log("op");
    }
    else if(buttonTextContent === '=') {
        console.log("eq");
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



