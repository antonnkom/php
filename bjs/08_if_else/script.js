const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const rangeSection = document.querySelector('#range');
const minField = rangeSection.querySelector('#min-value');
const maxField = rangeSection.querySelector('#max-value');
const gameSection = document.querySelector('#game');
const goSection = document.querySelector('#go');

let minValue = 0;
let maxValue = 100;
let answerNumber = '';
let orderNumber = 0;
let gameRun = false;

addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        let idButton = e.target.getAttribute('id');
        let answerPhrase = '';

        switch(idButton) {
            case 'btnOver':
                if (gameRun) {
                    if (minValue > maxValue) {
                        answerField.textContent = getAnswerPhrase(idButton, answerNumber);
                        gameRun = false;
                    } else {
                        minValue = answerNumber + 1;
                        answerNumber = getAnswerNumber(minValue, maxValue);
                        orderNumber++;
                        orderNumberField.textContent = orderNumber;
                        answerField.innerHTML = getAnswerPhrase(idButton, answerNumber);
                    }
                }
                break;

            case 'btnLess':
                if (gameRun) {
                    if (maxValue < minValue) {
                        answerField.textContent = getAnswerPhrase();
                        gameRun = false;
                    } else {
                        maxValue = answerNumber - 1;
                        answerNumber = getAnswerNumber(minValue, maxValue);
                        orderNumber++;
                        orderNumberField.textContent = orderNumber;
                        answerField.innerHTML = getAnswerPhrase(idButton, answerNumber);
                    }
                }
                break;

            case 'btnEqual':
                if (gameRun) {
                    answerField.innerText = getAnswerPhrase(idButton, answerNumber);
                    gameRun = false;
                }
                break;

            case 'btnRetry':
                getRange();
                gameSection.style.display = '';
                break;

            case 'btnStart':
                getRange();
                document.querySelector('#start').style.display = 'none';
                break;

            case 'btnSave':
                rangeSection.style.display = '';
                minValue = getMinValue();
                maxValue = getMaxValue();
                thinkNumber(minValue, maxValue);
                break;

            case 'btnGo':
                goSection.style.display = '';
                gameSection.style.display = 'block';
                answerNumber = getAnswerNumber(minValue, maxValue);
                orderNumber = 1;
                gameRun = true;
                orderNumberField.textContent = orderNumber;
                answerField.innerHTML = getAnswerPhrase('', answerNumber);
                break;

        }
    }
});

function getAnswerNumber(minVal, maxVal) {
    console.log(minVal, maxVal);
    return Math.floor((minVal + maxVal) / 2);
}

function getMinValue() {
    const minVal = parseInt(minField.value);
    return (minVal < -999) ? -999 : (minVal || 0);
}

function getMaxValue() {
    const maxVal = parseInt(maxField.value);
    if (maxVal === 0) {
        return 0;
    }
    return (maxVal > 999) ? 999 : (maxVal || 100);
}

function thinkNumber(minVal, maxVal) {
    const text = `Загадайте любое целое число от <span>${minVal}</span> до <span>${maxVal}</span>, а я его угадаю`;
    goSection.style.display = 'block';
    goSection.querySelector('.modal-body p').innerHTML = text;
}

function getAnswerPhrase(btn, answer) {
    const phraseRandom = Math.round(Math.random() * 3);
    const compare = minValue > maxValue;
    console.log(phraseRandom, compare, btn);

    if (btn === 'btnOver' || btn === 'btnLess') {
        switch (phraseRandom) {
            case 0:
                if (compare) {
                    return `Я сдаюсь..\n\u{1F92F}`;
                } else {
                    return `Вы загадали число<br> <span>${convertNumbersToWords(answer)}</span>?`;
                }
                break;
            
            case 1:
                if (compare) {
                    return `Вы загадали неправильное число!\n\u{1F914}`;
                } else {
                    return `Это легко! Ваше число<br> <span>${convertNumbersToWords(answer)}</span>?`;
                }
                break;

            case 2:
                if (compare) {
                    return `Ваше число не соответствует правилам игры.\n\u{1F914}`;
                } else {
                    return `Наверное, это число<br> <span>${convertNumbersToWords(answer)}</span>?`;
                }
                break;
            
            case 3:
                if (compare) {
                    return `Я не знаю. Сдаюсь..\n\u{1F92F}`;
                } else {
                    return `Ваше число<br> <span>${convertNumbersToWords(answer)}</span>?<br> Верно?`;
                }
                break;
        }
    } else if (btn === 'btnEqual') {
        switch (phraseRandom) {
            case 0:
                return `Я всегда угадываю\n\u{1F60E}`;
                break;
            case 1:
                return `Я знал, что угадаю\n\u{1F60E}`;
                break;
            case 2:
                return `Это было не сложно!\n\u{1F60E}`
                break;
            case 3:
                return `Я угадал!\n\u{1F60E}\nПопробуй ещё раз.`
                break;
        }
    } else {
        return `Вы загадали число<br> <span>${convertNumbersToWords(answer)}</span>?`;
    }
}

function convertNumbersToWords(num) {
    let ones = ['0', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    let strNum = '';
    let numString = Math.abs(num).toString();
    let charOne = '';
    let charTen = '';
    let charHundred = '';

    if (num < 20 && num > -20) {
        strNum = (num < 0) ? `минус ${ones[Math.abs(num)]}` : ones[num];
    } else if (num > 19 && num < 100 || num > -100 && num < -19) {
        charTen = tens[numString.charAt(0)];
        charOne = (numString.charAt(1) === '0') ? '' : ones[numString.charAt(1)];
        
        strNum = (num < 0) 
            ? `минус ${charTen} ${charOne}`.replace(/\s{2,}/g, ' ').trimEnd()
            : `${charTen} ${charOne}`.replace(/\s{2,}/g, ' ').trimEnd();
    } else {
        charHundred = hundreds[numString.charAt(0)];
        charTen = (numString.charAt(1) === '0') ? '' : tens[numString.charAt(1)];
        charOne = (numString.charAt(2) === '0') ? '' : ones[numString.charAt(2)];

        strNum = (num < 0)
            ? `минус ${charHundred} ${charTen} ${charOne}`.replace(/\s{2,}/g, ' ').trimEnd()
            : `${charHundred} ${charTen} ${charOne}`.replace(/\s{2,}/g, ' ').trimEnd();
    }

    return (strNum.length > 20) ? num : strNum;
}

function getRange(minVal = 0, maxVal = 100) {
    rangeSection.style.display = 'block';
    minField.value = minVal;
    maxField.value = maxVal;
}
