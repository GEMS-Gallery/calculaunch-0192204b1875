import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentValue = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('num')) {
            currentValue += value;
            display.value = currentValue;
        } else if (button.classList.contains('op')) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentValue);
                operator = value;
                currentValue = '';
            } else {
                calculate();
                operator = value;
            }
        }
    });
});

clearBtn.addEventListener('click', () => {
    currentValue = '';
    operator = '';
    firstOperand = null;
    display.value = '';
});

equalsBtn.addEventListener('click', calculate);

async function calculate() {
    if (firstOperand !== null && operator && currentValue) {
        const secondOperand = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    const divisionResult = await backend.divide(firstOperand, secondOperand);
                    if (divisionResult === null) {
                        throw new Error('Division by zero');
                    }
                    result = divisionResult;
                    break;
            }

            display.value = result;
            firstOperand = result;
            currentValue = '';
        } catch (error) {
            display.value = 'Error';
            console.error('Calculation error:', error);
        }
    }
}
