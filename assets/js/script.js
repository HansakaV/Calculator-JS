let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let firstOperand = '';
let operator = '';
let secondOperand = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        } else if (button.classList.contains('equals')) {
            calculate();
        } else {
            handleNumber(button.textContent);
        }
    });
});

function clear() {
    display.textContent = '0';
    firstOperand = '';
    operator = '';
    secondOperand = '';
    shouldResetDisplay = false;
}

function handleNumber(num) {
    if (shouldResetDisplay) {
        display.textContent = num;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? num : display.textContent + num;
    }
}

function handleOperator(op) {
    if (op === '±') {
        display.textContent = parseFloat(display.textContent) * -1;
        return;
    }
    if (op === '%') {
        display.textContent = parseFloat(display.textContent) / 100;
        return;
    }

    firstOperand = display.textContent;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operator || shouldResetDisplay) return;

    secondOperand = display.textContent;
    let result;

    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '×':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '÷':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }

    display.textContent = Number.isInteger(result) ? result : result.toFixed(2);
    operator = '';
    shouldResetDisplay = true;
}