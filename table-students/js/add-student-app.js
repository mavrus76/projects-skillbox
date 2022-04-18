const MOCK_STUDENTS = [
  {
    name: 'Александр',
    surname: 'Пантелеев',
    middleName: 'Сергеевич',
    faculty: 'экономический',
    birthday: `${new Date('2000-03-14').toLocaleDateString()} (${getAge(
      new Date('2000-03-14')
    )} лет)`,
    startStudy: `2021-2025 ${getCourseDefault(new Date('2021-09-01'))}`,
  },
  {
    name: 'Сергей',
    surname: 'Алтунин',
    middleName: 'Алексеевич',
    faculty: 'юридический',
    birthday: `${new Date('1989-08-24').toLocaleDateString()} (${getAge(
      new Date('1989-08-24')
    )} лет)`,
    startStudy: `2018-2022 ${getCourseDefault(new Date('2018-09-01'))}`,
  },
  {
    name: 'Юлия',
    surname: 'Яблокова',
    middleName: 'Андреевна',
    faculty: 'информатики',
    birthday: `${new Date('1993-04-04').toLocaleDateString()} (${getAge(
      new Date('1993-04-04')
    )} лет)`,
    startStudy: `2016-2020 ${getCourseDefault(new Date('2016-09-01'))}`,
  },
  {
    name: 'Александра',
    surname: 'Веселова',
    middleName: 'Сергеевна',
    faculty: 'экономический',
    birthday: `${new Date('1996-07-28').toLocaleDateString()} (${getAge(
      new Date('1996-07-28')
    )} лет)`,
    startStudy: `2020-2024 ${getCourseDefault(new Date('2020-09-01'))}`,
  },
  {
    name: 'Максим',
    surname: 'Игнатьев',
    middleName: 'Анатольевич',
    faculty: 'информатики',
    birthday: `${new Date('1996-05-11').toLocaleDateString()} (${getAge(
      new Date('1996-05-11')
    )} лет)`,
    startStudy: `2020-2024 ${getCourseDefault(new Date('2020-09-01'))}`,
  },
];

function getAge(birthday, today) {
  today = new Date();
  const diff = today.getTime() - birthday.getTime();
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

  return age;
}

// ******************************* for MOCK_STUDENTS
function getCourseDefault(start, today) {
  today = new Date();
  const diff = today.getTime() - start.getTime();
  const course = Math.ceil(diff / (1000 * 60 * 60 * 24 * 365.25));
  let textCourse = '';

  if (course > 4) {
    textCourse = 'закончил(а)';
  } else {
    textCourse = `(${course} курс)`;
  }

  return textCourse;
}

// ************************************ dynamic table app
(function (mockData) {
  let students = mockData || [];
  const createElement = (element) => document.createElement(element);

  // ******************************** for main data
  function getCourse(start, today) {
    start = new Date(
      `${Number(document.getElementById('startStudyForm').value.trim())}-09-01`
    );
    today = new Date();
    const diff = today.getTime() - start.getTime();
    const course = Math.ceil(diff / (1000 * 60 * 60 * 24 * 365.25));
    let textCourse = '';

    if (course > 4) {
      textCourse = 'закончил(а)';
    } else {
      textCourse = `(${course} курс)`;
    }

    return textCourse;
  }

  // **************************** the first capital
  function capFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  // ****************************** validation of year
  function validateDate(date) {
    const point = date.split('.');

    if (
      parseInt(point[2], 10) < 1900 ||
      parseInt(point[2], 10) > new Date().getFullYear()
    ) {
      return false;
    }

    return true;
  }

  function validateStart(year) {
    if (parseInt(year) < 2000 || parseInt(year) > new Date().getFullYear()) {
      return false;
    }

    return true;
  }

  // ************************* sort
  function sortArr(arr, index) {
    switch (index) {
      case 'sortName':
        arr.sort((row1, row2) => {
          const a = row1.surname;
          const b = row2.surname;
          return a < b ? -1 : 1;
        });
        break;
      case 'sortFaculty':
        arr.sort((row1, row2) => {
          const a = row1.faculty;
          const b = row2.faculty;
          return a < b ? -1 : 1;
        });
        break;
      case 'sortBirthday':
        compareDate(arr);
        break;
      case 'sortStartStudy':
        arr.sort((row1, row2) => {
          const a = row1.startStudy;
          const b = row2.startStudy;
          return a < b ? -1 : 1;
        });
        break;
      default:
        break;
    }
  }

  // ************************* case for sort
  function compareDate(arr) {
    arr.sort((row1, row2) => {
      const a = new Date(
        row1.birthday
          .split(' ')
          .splice(0, 1)
          .toString()
          .split('.')
          .reverse()
          .join('-')
      ).getTime();
      const b = new Date(
        row2.birthday
          .split(' ')
          .splice(0, 1)
          .toString()
          .split('.')
          .reverse()
          .join('-')
      ).getTime();
      return a < b ? -1 : 1;
    });
  }

  function delTable() {
    const table = document.getElementById('table');
    if (table) {
      table.parentNode.removeChild(table);
    }
  }

  function createTable() {
    const container = document.getElementById('table-students-app');
    const table = createElement('table');
    const caption = createElement('caption');
    const colgroup = createElement('colgroup');
    const colName = createElement('col');
    const colFaculty = createElement('col');
    const colBirthday = createElement('col');
    const colStartStudy = createElement('col');
    const thead = createElement('thead');
    const tr = createElement('tr');
    const thName = createElement('th');
    const thFaculty = createElement('th');
    const thBirthday = createElement('th');
    const thStartStudy = createElement('th');
    const tbody = createElement('tbody');

    table.classList.add('table');
    table.id = 'table';
    caption.classList.add('caption');
    colName.id = 'fullName';
    colFaculty.id = 'faculty';
    colBirthday.id = 'birthday';
    colStartStudy.id = 'startStudy';
    thName.classList.add('head');
    thFaculty.classList.add('head');
    thBirthday.classList.add('head');
    thStartStudy.classList.add('head');
    thName.scope = 'col';
    thFaculty.scope = 'col';
    thBirthday.scope = 'col';
    thStartStudy.scope = 'col';
    thName.id = 'sortName';
    thFaculty.id = 'sortFaculty';
    thBirthday.id = 'sortBirthday';
    thStartStudy.id = 'sortStartStudy';
    tbody.id = 'tbody';

    caption.textContent = 'Список студентов';
    thName.textContent = 'ФИО';
    thFaculty.textContent = 'Факультет';
    thBirthday.textContent = 'Дата рождения';
    thStartStudy.textContent = 'Годы обучения';

    container.append(table);
    table.append(caption);
    table.append(colgroup);
    colgroup.append(colName);
    colgroup.append(colFaculty);
    colgroup.append(colBirthday);
    colgroup.append(colStartStudy);
    table.append(thead);
    thead.append(tr);
    tr.append(thName);
    tr.append(thFaculty);
    tr.append(thBirthday);
    tr.append(thStartStudy);
    table.append(tbody);

    return {
      table,
      caption,
      colgroup,
      colName,
      colFaculty,
      colBirthday,
      colStartStudy,
      thead,
      tr,
      thName,
      thFaculty,
      thBirthday,
      thStartStudy,
      tbody,
    };
  }

  function createRowTable({
    surname,
    name,
    middleName,
    faculty,
    birthday,
    startStudy,
  }) {
    const tbody = document.getElementById('tbody');
    const row = createElement('tr');
    const tdName = createElement('td');
    const tdFaculty = createElement('td');
    const tdBirthday = createElement('td');
    const tdStartStudy = createElement('td');

    tdName.textContent = `${surname} ${name} ${middleName}`;
    tdFaculty.textContent = faculty;
    tdBirthday.textContent = birthday;
    tdStartStudy.textContent = startStudy;

    tbody.append(row);
    row.append(tdName);
    row.append(tdFaculty);
    row.append(tdBirthday);
    row.append(tdStartStudy);
  }

  function addRows(rowsData) {
    rowsData.forEach(createRowTable);
  }

  function reTable(rowsData) {
    delTable();
    createTable();
    addRows(rowsData);
  }

  // ******************************** sort, filter and render
  function renderTable() {
    const sortedStudents = students.slice();
    const form = document.querySelector('.filters');
    const blockTable = document.querySelector('#table-students-app');

    blockTable.addEventListener('click', (e) => {
      const el = e.target;
      sortArr(sortedStudents, el.id);
      reTable(sortedStudents);
    });

    form.addEventListener('input', () => {
      const inputValue = document.forms.filters;
      const nameInput = inputValue.filterName.value.trim().toUpperCase();
      const facultyInput = inputValue.filterFaculty.value.trim().toUpperCase();
      const startStudyInput = inputValue.filterStartStudy.value
        .trim()
        .toUpperCase();
      const endStudyInput = inputValue.filterEndStudy.value
        .trim()
        .toUpperCase();

      const filteredStudents = students.filter(
        (item) =>
          (item.name.toUpperCase().indexOf(nameInput) > -1 ||
            item.surname.toUpperCase().indexOf(nameInput) > -1 ||
            item.middleName.toUpperCase().indexOf(nameInput) > -1) &&
          item.faculty.toUpperCase().indexOf(facultyInput) > -1 &&
          item.startStudy
            .split('-')
            .splice(0, 1)
            .toString()
            .split(' ')
            .splice(0, 1)
            .toString()
            .indexOf(startStudyInput) > -1 &&
          item.startStudy
            .split('-')
            .splice(1, 1)
            .toString()
            .split(' ')
            .splice(0, 1)
            .toString()
            .indexOf(endStudyInput) > -1
      );

      reTable(filteredStudents);

      blockTable.addEventListener('click', (e) => {
        const el = e.target;
        sortArr(filteredStudents, el.id);
        reTable(filteredStudents);
      });
    });
  }

  /*
   ********************************** DOMContentLoaded
   */

  document.addEventListener('DOMContentLoaded', () => {
    createAddStudentApp(document.getElementById('table-students-app'), 'local');
    renderTable();
  });

  /*
   ********************************* add student in the table
   */
  function createAddStudentApp(container, local) {
    const subform = document.getElementById('subform');
    const error = document.getElementById('error');

    createTable();

    if (localStorage.getItem(local) !== null) {
      students = JSON.parse(localStorage.getItem(local));
    }

    addRows(students);

    localStorage.setItem(local, JSON.stringify(students));

    error.addEventListener('click', () => {
      error.style.display = 'none';
    });

    subform.addEventListener('submit', (e) => {
      e.preventDefault();

      const el = e.target;
      const name = capFirst(el.name.value.trim().toLowerCase());
      const surname = capFirst(el.surname.value.trim().toLowerCase());
      const middleName = capFirst(el.middleName.value.trim().toLowerCase());
      const faculty = el.faculty.value.trim().toLowerCase();
      const birthday = `${el.birthday.valueAsDate.toLocaleDateString()} (${getAge(
        new Date(el.birthday.valueAsDate)
      )} лет)`;
      const startStudy = `${el.startStudy.value.trim()}-${
        Number(el.startStudy.value.trim()) + 4
      } ${getCourse()}`;

      if (
        validateDate(el.birthday.valueAsDate.toLocaleDateString()) &&
        validateStart(Number(el.startStudy.value.trim()))
      ) {
        students.push({
          name,
          surname,
          middleName,
          faculty,
          birthday,
          startStudy,
        });
        reTable(students);

        localStorage.setItem(local, JSON.stringify(students));
        el.reset();
      } else {
        error.style.display = 'block';
      }
    });
  }

  window.createAddStudentApp = createAddStudentApp;
})(MOCK_STUDENTS);
