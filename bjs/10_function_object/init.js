const btnGenerate = document.querySelector('#btnGenerate');
const btnReset = document.querySelector('#btnReset');

window.addEventListener('load', () => {
    generate();
});

btnGenerate.addEventListener('click', () => {
    generate();
});

btnReset.addEventListener('click', () => {
    getData();
});

function generate ()
{
    const initPerson = personGenerator.getPerson();
    getData(initPerson);
}

function getData (person = null)
{
    document.querySelector('#firstNameOutput').textContent = (person !== null) ? person.firstName : '';
    document.querySelector('#surnameOutput').textContent = (person !== null) ? person.surname : '';
    document.querySelector('#middleNameOutput').textContent = (person !== null) ? person.middleName : '';
    document.querySelector('#genderOutput').textContent = (person !== null) ? person.gender : '';
    document.querySelector('#birthYearOutput').textContent = (person !== null)
        ? `${person.dayOfBirth} ${person.monthOfBirth} ${person.yearOfBirth}`
        : '';
    document.querySelector('#jobOutput').textContent = (person !== null) ? person.profession : '';
}

