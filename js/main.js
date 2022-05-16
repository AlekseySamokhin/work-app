import Worker from "./worker.js";

let workers = [];

const $workerList = document.getElementById("workers-list");
const $workerListThAll = document.querySelectorAll(".workers-table th");

let column = "fullName";
let columnDir = true;

function newWorker(worker) {
  const $worker = document.createElement("tr");
  const $fio = document.createElement("td");
  const $birthDate = document.createElement("td");
  const $age = document.createElement("td");
  const $gender = document.createElement("td");
  const $education = document.createElement("td");
  const $workStart = document.createElement("td");
  const $dismissalDate = document.createElement("td");

  $fio.textContent = worker.fullName;
  $birthDate.textContent = worker.getBithDateString();
  $age.textContent = worker.getAge();
  $gender.textContent = worker.gender;
  $education.textContent = worker.education;
  $workStart.textContent = worker.getCurrentTime();
  $dismissalDate.textContent = worker.dismissalDate;

  $worker.append(
    $fio,
    $birthDate,
    $age,
    $gender,
    $education,
    $workStart,
    $dismissalDate
  );

  return $worker;
}

function getSortWorkers(prop, dir) {
  const workersCopy = [...workers];
  return workersCopy.sort(function(workerA, workerB) {
    if((!dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]))
    return -1;
  })
}

function render() {
  let workersCopy = [...workers];
  workersCopy = getSortWorkers(column, columnDir);
  $workerList.innerHTML = " ";
  for (const worker of workersCopy) {
    $workerList.append(newWorker(worker));
  }
}

$workerListThAll.forEach(element => {
  element.addEventListener('click', function(){
    column = this.dataset.column;
    columnDir = !columnDir;
    render()
  })
})

document.getElementById('input-education').addEventListener('click', function() {
    this.value = this.checked ? 'Есть' : 'Нет';
});

document.getElementById('add-worker').addEventListener('submit', function(event) {
  event.preventDefault()
  workers.push(new Worker(
    document.getElementById('input-lastName').value,
    document.getElementById('input-firstName').value,
    document.getElementById('input-middleName').value,
    new Date(document.getElementById('input-birthDate').value),
    document.getElementById('input-education').value,
    document.querySelector("input[name=gender]:checked").value,
  ))
  document.getElementById('add-worker').reset(), 
  render();
});

render();
