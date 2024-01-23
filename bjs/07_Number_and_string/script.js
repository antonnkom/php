let lastOrepation = null;
let lastOperand = null;
let operation = null;
let result = '';
const inputWindow = document.querySelector('#inputWindow');

addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        let indexButton = e.target.dataset.index;

        switch (indexButton) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                inputWindow.value = pressNumber(operation, indexButton, inputWindow.value);
                operation = 'pressnum';
                break;

            case 'c':
                lastOperand = 0;
                result = '';
                operation = null;
                inputWindow.value = 0;
                lastOrepation = null;
                break;
                
            case 'sum':
                operation = indexButton;
                lastOperand = lastOperand === null ? 0 : inputWindow.value; 
                
                if (result === '' || lastOrepation === 'equals') {
                    result = 0;
                    result = getSum(result, inputWindow.value);
                } else if (lastOrepation === null || lastOrepation === operation) {
                    result = getSum(result, inputWindow.value);
                } else {
                    result = getEquals(lastOrepation, result, lastOperand);
                }

                lastOperand = inputWindow.value;
                lastOrepation = operation;
                inputWindow.value = result;
                break;
            
            case 'diff':
                operation = indexButton;
                lastOperand = lastOperand === null ? 0 : inputWindow.value; 

                if (result === '') {
                    result = inputWindow.value;
                } else if (lastOrepation === null || lastOrepation === operation) {
                    result = getDiff(result, inputWindow.value);
                } else {
                    result = getEquals(lastOrepation, result, lastOperand);
                }

                lastOperand = inputWindow.value;
                lastOrepation = operation;
                inputWindow.value = result;
                break;

            case 'mult':
                operation = indexButton;
                lastOperand = lastOperand === null ? 0 : inputWindow.value; 

                if (result === '') {
                    result = inputWindow.value;
                } else if (lastOrepation === null || lastOrepation === operation) {
                    result = getMult(result, inputWindow.value);
                } else {
                    result = getEquals(lastOrepation, result, lastOperand);
                }

                lastOperand = inputWindow.value;
                lastOrepation = operation;
                inputWindow.value = result;
                break;

            case 'div':
                operation = indexButton;
                lastOperand = lastOperand === null ? 0 : inputWindow.value; 

                if (result === '') {
                    result = inputWindow.value;
                } else if (lastOrepation === null || lastOrepation === operation) {
                    result = getDiv(result, inputWindow.value);
                } else {
                    result = getEquals(lastOrepation, result, lastOperand);
                }

                if (result === 'Cannot divide by zero') {
                    inputWindow.value = result;
                    lastOperand = 0;
                    result = '';
                    operation = null;
                    lastOrepation = null;
                } else {
                    lastOperand = inputWindow.value;
                    lastOrepation = operation;
                    inputWindow.value = result;
                }
                break;

            case 'sqrt':
                operation = indexButton;
                result = getSqrt(inputWindow.value);
                lastOperand === null;
                lastOrepation === null;
                inputWindow.value = result;
                result = '';
                break;   

            case 'equals':
                operation = indexButton;
                result = getEquals(lastOrepation, result, inputWindow.value);
                lastOperand === null;
                lastOrepation === null;
                inputWindow.value = result;
                result = '';
                break;
        }
    }
});

function pressNumber(oper, number, input) {
    return oper === null || oper !== 'pressnum' || input == 0 ? number : input + number;
}

function getSum(res, val) {
    return parseFloat(res) + parseFloat(val);
}

function getDiff(res, val) {
    return parseFloat(res) - parseFloat(val);
}

function getMult(res, val) {
    return parseFloat(res) * parseFloat(val);
}

function getDiv(res, val) {
    if (val == 0) {
        return 'Cannot divide by zero';
    }
    return parseFloat(res) / parseFloat(val);
}

function getSqrt(val) {
    if (val < 0) {
        return 'Invalid input';
    }
    return Math.sqrt(parseFloat(val));
}

function getEquals(oper, res, val) {
    switch (oper) {
        case 'sum':
            return getSum(res, val);
            break;
        
        case 'diff':
            return getDiff(res, val);
            break;

        case 'mult':
            return getMult(res, val);
            break;

        case 'div':
            return getDiv(res, val);
            break;

        case 'sqrt':
            return res;
            break;
    }
}