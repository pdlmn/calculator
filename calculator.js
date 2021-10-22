const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const initialNumDiv = document.querySelector('#initial-num-row');
const currentNumDiv = document.querySelector('#current-num-row');

let x = 0
const calculator = {
  'add': function() {
    return this.initialNum + this.currentNum;
  },
  'subtract': function() {},
  'clear': function() {
    currentNumDiv.textContent = '';
  },
}

function addDigitToDisplay(e) {
  digit = e.target.dataset.digit;
  let dotInDisplay = currentNumDiv.textContent.includes('.');
  if (digit === '.' && dotInDisplay) {
    return
  }
  currentNumDiv.textContent += digit;
}

function calculate(e) {
  if (!calculator.initialNum) {
    calculator.initialNum = Number(currentNumDiv.textContent);
    console.log('Firstnum is: ' + calculator.initialNum);
    return
  }
  calculator.currentNum = Number(currentNumDiv.textContent);
  console.log('secondnum is: ' + calculator.currentNum);
  operator = e.target.dataset.operator;
  calculator.initialNum = calculator[operator]();
  console.log('result is: ' + calculator.initialNum);
}

function updateDisplay() {
  initialNumDiv.textContent = calculator.initialNum;
  currentNumDiv.innerHTML = '<br>';
}

digitButtons.forEach(button => button.addEventListener('click', addDigitToDisplay));
operatorButtons.forEach(button => button.addEventListener('click', calculate));
operatorButtons.forEach(button => button.addEventListener('click', updateDisplay));
