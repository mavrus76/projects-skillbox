/* eslint-disable import/extensions */
import Worker from './worker.js';

const workers = [
  new Worker(
    'Игорь',
    'Фролов',
    'Сергеевич',
    2011,
    new Date(1992, 2, 21),
    'Строитель'
  ),
  new Worker('Алена', 'Белых', 'Юрьевна', 2021, new Date(1998, 4, 11), 'Юрист'),
  new Worker(
    'Иван',
    'Иванов',
    'Иванович',
    2001,
    new Date(1987, 1, 23),
    'Рабочий'
  ),
];

const $workersList = document.getElementById('workers-list');
const $workersListTHAll = document.querySelectorAll('.workers-table th');

let column = 'fullName';
let columnDir = true;

function newWorkerTR(worker) {
  const $workerTR = document.createElement('tr');
  const $fullNameTD = document.createElement('td');
  const $birthDateTD = document.createElement('td');
  const $workStartTD = document.createElement('td');
  const $postTD = document.createElement('td');

  $fullNameTD.textContent = worker.fullName;
  $birthDateTD.textContent = `${worker.getBirthDateString()} (${worker.getAge()} лет)`;
  $workStartTD.textContent = `${
    worker.workStart
  } (${worker.getWorkPeriod()} лет)`;
  $postTD.textContent = worker.post;

  $workerTR.append($fullNameTD);
  $workerTR.append($birthDateTD);
  $workerTR.append($workStartTD);
  $workerTR.append($postTD);

  return $workerTR;
}

function getSortWorkers(prop, dir) {
  const workersCopy = [...workers];
  return workersCopy.sort(function (workerA, workerB) {
    if (
      !dir == false
        ? workerA[prop] < workerB[prop]
        : workerA[prop] > workerB[prop]
    )
      return -1;
  });
}

function render() {
  let workersCopy = [...workers];

  workersCopy = getSortWorkers(column, columnDir);

  // workersCopy = filter();

  $workersList.innerHTML = '';
  for (const worker of workersCopy) {
    $workersList.append(newWorkerTR(worker));
  }
}

$workersListTHAll.forEach((element) => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    render();
  });
});

document
  .getElementById('add-worker')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    workers.push(
      new Worker(
        document.getElementById('input-surname').value,
        document.getElementById('input-name').value,
        document.getElementById('input-lastName').value,
        Number(document.getElementById('input-workStart').value),
        new Date(document.getElementById('input-birthDate').value),
        document.getElementById('input-post').value
      )
    );

    render();
  });

render();
