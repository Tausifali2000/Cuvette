let currentExpression = ''; 


function updateDisplay(value) {
    document.getElementById('display').innerText = value
}


function appendNumber(number) {
    const lastChar = currentExpression.slice(-1);
    if (lastChar === '.' && number === '.') return;

    currentExpression += number;
    updateDisplay(currentExpression);
}


function appendOperator(op) {
    const lastChar = currentExpression.slice(-1);
    
    if (['+', '-', '*', '/'].includes(lastChar) || currentExpression === '') {
        return;
    }

    currentExpression += op;
    updateDisplay(currentExpression);
}


function calculate() {
    try {
        
        let result = eval(currentExpression); 
        if (isNaN(result)) {
            updateDisplay('Error');
        } else {
            updateDisplay(result);
            currentExpression = result.toString(); 
        }
    } catch (error) {
        updateDisplay('Error'); 
    }
}

function reset() {
    currentExpression = '';
    updateDisplay('0');
}


function deleteLast() {
    currentExpression = currentExpression.slice(0, -1);
    if (currentExpression === '') {
        updateDisplay('0');
    }
   
    
    else {
        updateDisplay(currentExpression);
    }
}
