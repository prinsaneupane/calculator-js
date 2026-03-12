const display = document.querySelector(".calc p");
const buttons = document.querySelectorAll("button");

let currentInput = "0"; //display section of the calc div
let previousInput = ""; //stores number before an operator is clicked
let operator = null; //stores the current operator
let resetScreen = false; // a flag; decides if we should reset the screen when the user enters a new number

// event listeners for different buttons
buttons.forEach((button) => {
  //loop through each and every button; each will get a click handler
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (!isNaN(buttonText) || buttonText === ".") {
      handleNumber(buttonText);
    } else if (buttonText === "AC") {
      clear();
    } else if (buttonText === "<<") {
      backspace();
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    } else {
      handleOperator(buttonText);
    }
    updateDisplay();
  });
});

function handleNumber(num) {
  //runs when a number or decimal point is clicked
  if (currentInput === "0" || resetScreen) {
    //if screen shows 0 or needs to reset
    currentInput = num; // replace the screen with a new number
    resetScreen = false; //stop resetting the screen
  } else {
    if (num === "." && currentInput.includes(".")) return; //prevents more than one decimal point
    currentInput += num; //adds new digit to the end
  }
}
function clear() {
  // everything goes back to default; easy to understand
  currentInput = "0";
  previousInput = "";
  operator = null;
}

function backspace() {
  if (resetScreen) return; //if the screen needs to reset, do nothing
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0"; //remove last character or reset to 0 if only one character is left; use of ternanry operator
}

function calculate() {
  if (operator === null || resetScreen) return;
  const prevs = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;
  if (operator === "+") {
    result = prevs + current;
  } else if (operator === "-") {
    result = prevs - current;
  } else if (operator === "×") {
    result = prevs * current;
  } else if (operator === "÷") {
    result = current === 0 ? "Error" : prevs / current;
  }
  currentInput = result.toString();
  operator = null;
}

function handleOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  resetScreen = true;
}

function updateDisplay() {
  display.innerText = currentInput;
}
document.addEventListener("keydown", (e) => {
  let key = e.key;

  // Numbers & decimal
  if (!isNaN(key) || key === ".") {
    handleNumber(key);
  }

  // Operators
  else if (key === "+" || key === "-") {
    handleOperator(key);
  } else if (key === "*") {
    handleOperator("×");
  } else if (key === "/") {
    handleOperator("÷");
  }

  // Equals
  else if (key === "Enter" || key === "=") {
    calculate();
  }

  // Backspace
  else if (key === "Backspace") {
    backspace();
  }

  // Clear
  else if (key === "Escape") {
    clear();
  }

  // Percentage
  else if (key === "%") {
    currentInput = (parseFloat(currentInput) / 100).toString();
  }

  updateDisplay();
});
