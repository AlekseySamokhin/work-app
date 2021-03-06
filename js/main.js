//const isCheckboxOrRadio = (type) => ["checkbox", "radio"].includes("type");

//const { form } = document.forms;

//form.addEventListener("submit", function retrieveFormValue(event) {
//  event.preventDefault();

//  const { elements } = form;
//  const values = {};

//  for (let i = 0; i < elements.length; i++) {
//    const formElement = elements[i];
//    const { name } = formElement;

//    if (name) {
//      const { value, type, checked } = formElement;
//      values[name] = isCheckboxOrRadio(type) ? checked : value;

//      values[name] = isCheckboxOrRadio(type) ? checked : value;
//    }
//  }

//  console.log(values);
//});

import Worker from "./worker.js";

let workers = [];

const $workerList = document.getElementById("workers-list");

function newWorker(worker) {
  const $worker = document.createElement("tr");
  const $number = document.createElement("td");
  const $fio = document.createElement("td");
  const $birthDate = document.createElement("td");
  const $age = document.createElement("td");
  const $gender = document.createElement("td");
  const $education = document.createElement("td");
  const $workStart = document.createElement("td");
  const $dismissalDate = document.createElement("td");
  const $actions = document.createElement("td");
  const $deleteBtn = document.createElement("button");
  const $changeBtn = document.createElement("button");

  $fio.textContent = worker.fullName;
  $birthDate.textContent = worker.getBirthDateString();
  $age.textContent = worker.getAge();
  $gender.textContent = worker.gender;
  $education.textContent = worker.education;
  $workStart.textContent = worker.getCurrentTime();
  $dismissalDate.textContent = worker.dismissalDate;

  // button delete
  $deleteBtn.appendChild(document.createTextNode("Удалить"));
  $deleteBtn.className = "btn btn-danger btn-sm";
  $deleteBtn.addEventListener("click", function(e) {
    e.target.parentNode.parentNode.remove();
  });

  // button change
  $changeBtn.appendChild(document.createTextNode("Изменить"));
  $changeBtn.className = "btn btn-success btn-sm me-2";
  $changeBtn.addEventListener("click", () => {
    console.log("hello");
  });

  $actions.append($changeBtn, $deleteBtn);

  $worker.append(
    $number,
    $fio,
    $birthDate,
    $age,
    $gender,
    $education,
    $workStart,
    $dismissalDate,
    $actions
  );

  return $worker;
}

function render() {
  $workerList.innerHTML = "";

  for (const worker of workers) {
    $workerList.append(newWorker(worker));
  }
}

document
  .getElementById("input-education")
  .addEventListener("click", function () {
    this.value = this.checked ? "Есть" : "Нет";
  });

document
  .getElementById("add-worker")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(workers);
    workers.push(
      new Worker(
        document.getElementById("input-lastName").value,
        document.getElementById("input-firstName").value,
        document.getElementById("input-middleName").value,
        new Date(document.getElementById("input-birthDate").value),
        document.getElementById("input-education").value,
        document.querySelector("input[name=gender]:checked").value
      )
    );
    document.getElementById("add-worker").reset();
    render();
  });

render();
