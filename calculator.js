const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const operationDiv = document.querySelector('#operation-row');
const inputDiv = document.querySelector('#input-row');
const equalsButton = document.querySelector('#equals');

let operator = '';

const calculator = {
  'add': function() {
    return this.resultNum + this.currentNum;
  },
  'subtract': function() {
    return this.resultNum - this.currentNum;
  },
  'multiply': function() {
    return this.resultNum * this.currentNum;
  },
  'divide': function() {
    return this.resultNum / this.currentNum;
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

function calculate(e) {
  if (!inputDiv.textContent) return
  operator = e.target.dataset.operator;
  if (!calculator.resultNum) {
    calculator.resultNum = Number(inputDiv.textContent);
    operationDiv.textContent = `${calculator.resultNum} ${e.target.textContent} `;
    inputDiv.innerHTML = '<br>';
    console.log(operator);
    return
  } 
  calculator.currentNum = Number(inputDiv.textContent);
  calculator.resultNum = calculator[operator]();

  operationDiv.textContent = `${calculator.resultNum} ${e.target.textContent} `;
  inputDiv.innerHTML = '<br>';
}

function equals() {
  if (!operator || !inputDiv.textContent) return
  calculator.currentNum = Number(inputDiv.textContent);
  calculator.resultNum = calculator[operator]();
  operator = '';

  operationDiv.textContent += `${calculator.currentNum} = ${calculator.resultNum}`;
  inputDiv.innerHTML = '<br>';
}

digitButtons.forEach(button => button.addEventListener('click', addDigitToDisplay));
operatorButtons.forEach(button => button.addEventListener('click', calculate));
equalsButton.addEventListener('click', equals);
