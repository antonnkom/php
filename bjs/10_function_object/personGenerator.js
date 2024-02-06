const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Марина",
            "id_3": "Ирина",
            "id_4": "Анна",
            "id_5": "Юлия",
            "id_6": "Наталья",
            "id_7": "Мария",
            "id_8": "Дарья",
            "id_9": "Евгения",
            "id_10": "Анастасия"
        }
    }`,
    monthOfBirthJson: `{
        "count": 12,
        "list": {
            "id_1": "январь",
            "id_2": "февраль",
            "id_3": "март",
            "id_4": "апрель",
            "id_5": "май",
            "id_6": "июнь",
            "id_7": "июль",
            "id_8": "август",
            "id_9": "сентябрь",
            "id_10": "октябрь",
            "id_11": "ноябрь",
            "id_12": "декабрь"
        }
    }`,
    professionJson: `{
        "count": 20,
        "list": {
            "id_1": ["Слесарь", "male"],
            "id_2": ["Учитель", "all"],
            "id_3": ["Менеджер", "all"],
            "id_4": ["Писатель", "all"],
            "id_5": ["Солдат", "male"],
            "id_6": ["Медсестра", "female"],
            "id_7": ["Доктор", "all"],
            "id_8": ["Повар", "all"],
            "id_9": ["Пилот", "male"],
            "id_10": ["Грузчик", "male"],
            "id_11": ["Швея", "female"],
            "id_12": ["Программист", "all"],
            "id_13": ["Дизайнер", "all"],
            "id_14": ["Юрист", "all"],
            "id_15": ["Шахтёр", "male"],
            "id_16": ["Стюардесса", "female"],
            "id_17": ["Водитель", "all"],
            "id_18": ["Строитель", "male"],
            "id_19": ["Переводчик", "all"],
            "id_20": ["Журналист", "all"]
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomGender: function () {
        return this.randomIntNumber() ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    randomFirstName: function (gender) {
        return gender === this.GENDER_MALE
            ? this.randomValue(this.firstNameMaleJson)
            : this.randomValue(this.firstNameFemaleJson);
    },

    randomSurname: function (gender) {
        let surname = this.randomValue(this.surnameJson);
        return gender === this.GENDER_MALE ? surname : surname + 'a';
    },

    randomMiddleName: function (gender) {
        let name = this.randomValue(this.firstNameMaleJson);
        if (name.slice(-1) === 'й') {
            return gender === 'Мужчина' ? name.slice(0, -1) + 'евич' : name.slice(0, -1) + 'евна';
        } else if (name.slice(-1) === 'а') {
            return gender === 'Мужчина' ? name.slice(0, -1) + 'ич' : name.slice(0, -1) + 'ична';
        } else if (name === 'Михаил') {
            return gender === 'Мужчина' ? name.slice(0, -2) + 'йлович' : name.slice(0, -2) + 'йловна';
        } else {
            return gender === 'Мужчина' ? name + 'ович' : name + 'овна';
        }
    },

    randomYearOfBirth: function () {
        let randomYear = this.randomIntNumber(99);
        if (randomYear < 25) {
            return randomYear < 10 ? '200' + randomYear : '20' + randomYear;
        } else {
            return (randomYear > 24 && randomYear < 60) ? '19' + (randomYear + 35) : '19' + randomYear; 
        }
    },

    randomMonthOfBirth: function () {
        let randomMonth = this.randomValue(this.monthOfBirthJson);
        return (randomMonth !== 'март' && randomMonth !== 'август')
            ? randomMonth.slice(0, -1) + 'я'
            : randomMonth + 'a';
    },

    randomDayOfBirth: function (year, month) {
        switch (month) {
            case 'апреля':
            case 'июня':
            case 'сентября':
            case 'ноября':
                return this.randomIntNumber(30, 1);
                break;
            
            case 'февраля':
                return (year % 4 === 0) ? this.randomIntNumber(29, 1) : this.randomIntNumber(28, 1);
                break;

            default:
                return this.randomIntNumber(31, 1);
                break;
        }
    },

    randomProfession: function (gender, year) {
        if (parseInt(year) > 2007 && parseInt(year) < 2017) {
            return 'Студент';
        } else if (parseInt(year) > 2016) {
            return 'нет';
        } else {
            if (gender === 'Мужчина') {
                return this.getProfByGender('female');
            } else {
                return this.getProfByGender('male');
            }
        }
    },

    getProfByGender: function (gender) {
        let obj = this.randomValue(this.professionJson);
        if (obj[1] !== gender) {
            return [obj[0]];
        } else {
            return this.getProfByGender(gender);
        }
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.middleName = this.randomMiddleName(this.person.gender);
        this.person.yearOfBirth = this.randomYearOfBirth();
        this.person.monthOfBirth = this.randomMonthOfBirth();
        this.person.dayOfBirth = this.randomDayOfBirth(this.person.yearOfBirth, this.person.monthOfBirth);
        this.person.profession = this.randomProfession(this.person.gender, this.person.yearOfBirth);
        return this.person;
    }
};
