const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const operationDiv = document.querySelector('#operation-row');
const inputDiv = document.querySelector('#input-row');
const equalsButton = document.querySelector('#equals');

let operator = '';

const calculator = {
  'add': function() {
    return this.accumulatorNum + this.inputedNum;
  },
  'subtract': function() {
    return this.accumulatorNum - this.inputedNum;
  },
  'multiply': function() {
    return this.accumulatorNum * this.inputedNum;
  },
  'divide': function() {
    return this.accumulatorNum / this.inputedNum;
  }
}

function addDigitToDisplay(e) {
  digit = e.target.dataset.digit;
  let dotInDisplay = inputDiv.textContent.includes('.');
  if (digit === '.' && dotInDisplay) {
    return
  }
  inputDiv.textContent += digit;
}

function clear() {
  operationDiv.textContent = '';
  inputDiv.textContent = '';
  delete calculator.accumulatorNum;
  delete calculator.inputedNum;
}

function deleteDigit() {
  inputDiv.textContent = inputDiv.textContent.slice(0, -1);
}

function calculate(e) {
  if (!inputDiv.textContent) return

  if (!calculator.accumulatorNum) {
    calculator.accumulatorNum = Number(inputDiv.textContent);
    operator = e.target.dataset.operator;
  } else {
    calculator.inputedNum = Number(inputDiv.textContent);
    if (operator) {
      calculator.accumulatorNum = calculator[operator]();
    }
    operator = e.target.dataset.operator;
  }
}

function updateDisplay(e) {
  if (e.target.dataset.operator) {
    operationDiv.textContent = `${calculator.accumulatorNum} ${e.target.textContent} `;
    inputDiv.innerHTML = '<br>';
  }
}

function equalsTo() {
  if (!calculator.accumulatorNum || !inputDiv.textContent) return

  calculator.inputedNum = Number(inputDiv.textContent);
  calculator.accumulatorNum = calculator[operator]();
  operator = '';

  operationDiv.textContent += `${calculator.inputedNum} = `;
  inputDiv.textContent = calculator.accumulatorNum;

  delete calculator.accumulatorNum;
}

digitButtons.forEach(button => button.addEventListener('click', addDigitToDisplay));
operatorButtons.forEach(button => button.addEventListener('click', calculate));
operatorButtons.forEach(button => button.addEventListener('click', updateDisplay));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteDigit);
equalsButton.addEventListener('click', equalsTo);
