const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const operationDiv = document.querySelector('#operation-row');
const inputDiv = document.querySelector('#input-row');
const equalsButton = document.querySelector('#equals');

const operatorKeys = ['+', '-', '*', ':'];

let operator = '';

const calculator = {
  'add':      function() { return this.accumulatorNum + this.inputedNum },
  'subtract': function() { return this.accumulatorNum - this.inputedNum },
  'multiply': function() { return this.accumulatorNum * this.inputedNum },
  'divide':   function() { return this.accumulatorNum / this.inputedNum }
};

initialize();

function addDigitToDisplay(e) {
  if (e.type === 'keydown') {
    digitButton = document.querySelector(`[data-digit="${e.key}"]`);
    if (!digitButton) return

    digit = digitButton.dataset.digit;
  } else if (e.type === 'click') {
    digit = e.target.dataset.digit;
  }
  let dotInDisplay = inputDiv.textContent.includes('.');
  if (digit === '.' && dotInDisplay ||
      inputDiv.textContent.length >= 13) {
    return
  }
  inputDiv.textContent += digit;
}

function clear(e) {
  if (e.type === 'click' ||
      e.type === 'keydown' && e.key === 'Backspace' && e.shiftKey) {
    operationDiv.textContent = '';
    inputDiv.textContent = '';
    delete calculator.accumulatorNum;
    delete calculator.inputedNum;
  }
}

function deleteDigit(e) {
  if (e.type === 'click' ||
      e.type === 'keydown' && e.key === 'Backspace') {
    inputDiv.textContent = inputDiv.textContent.slice(0, -1);
  }
}

function calculate(e) {
  if (!inputDiv.textContent) return

  if (e.type === 'click' ||
      e.type === 'keydown' && operatorKeys.includes(e.key)) {
    if (!calculator.accumulatorNum) {
      calculator.accumulatorNum = Number(inputDiv.textContent);
    } else {
      calculator.inputedNum = Number(inputDiv.textContent);
      if (calculator.inputedNum === 0) {
        alert("You can't divide by 0!"); 
        return 
      }
      if (operator) {
        calculator.accumulatorNum = toPrescisionOfThree(calculator[operator]());
      }
    }
  }
}

function equalsTo(e) {
  if (!calculator.accumulatorNum ||
      !inputDiv.textContent ||
      e.type === 'keydown' && e.key !== '=') return

  calculator.inputedNum = Number(inputDiv.textContent);
  if (calculator.inputedNum === 0) {
    alert("You can't divide by 0!");
    return
  }
  calculator.accumulatorNum = toPrescisionOfThree(calculator[operator]());
  operator = '';

  operationDiv.textContent += `${calculator.inputedNum} = `;
  inputDiv.textContent = calculator.accumulatorNum;

  delete calculator.accumulatorNum;
}

function toPrescisionOfThree(num) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000
}

function changeOperator(e) {
  if (e.type === 'click') {
    operator = e.target.dataset.operator;
  } else if (e.type === 'keydown' && operatorKeys.includes(e.key)) {
    operatorButton = document.querySelector(`[data-key-operator="${e.key}"]`);
    operator = operatorButton.dataset.operator;
  }
}

function updateDisplay(e) {
  if (!inputDiv.textContent && !calculator.accumulatorNum) return

  if (e.type === 'click') {
    operationDiv.textContent = `${calculator.accumulatorNum} ${e.target.textContent} `;
    inputDiv.textContent = '';
  } else if (e.type === 'keydown') {
    operatorButton = document.querySelector(`[data-key-operator="${e.key}"]`);
    if (!operatorButton) return
    operationDiv.textContent = `${calculator.accumulatorNum} ${operatorButton.textContent} `;
    inputDiv.textContent = '';
  }
}

function initialize() {
  clearButton.addEventListener('click', clear);
  window.addEventListener('keydown', clear);

  digitButtons.forEach(button => button.addEventListener('click', addDigitToDisplay));
  deleteButton.addEventListener('click', deleteDigit);
  equalsButton.addEventListener('click', equalsTo);
  window.addEventListener('keydown', addDigitToDisplay);
  window.addEventListener('keydown', deleteDigit);
  window.addEventListener('keydown', equalsTo);

  operatorButtons.forEach(button => button.addEventListener('click', calculate));
  operatorButtons.forEach(button => button.addEventListener('click', updateDisplay));
  operatorButtons.forEach(button => button.addEventListener('click', changeOperator));
  window.addEventListener('keydown', calculate);
  window.addEventListener('keydown', updateDisplay);
  window.addEventListener('keydown', changeOperator);
}
