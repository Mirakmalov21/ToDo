const inputEl = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submit");
let activities = document.querySelector("#activities");
let activityComplete = document.querySelector("#completed");

let taskList = [];
submitBtn.addEventListener("click", () => {
  let inputValue = inputEl.value.replace(/\s+/g, "");
  if (inputValue === "") {
    alert("Please enter a task!");
  } else {
    const task = {
      task: inputEl.value,
      iscompleted: false,
      id: taskList.length,
    };
    taskList[taskList.length] = task;
    render();
    inputEl.value = "";
  }
});

function render() {
  activities.innerHTML = "";
  activityComplete.innerHTML = "";
  taskList.forEach((taskListItem, index) => {
    const template = `  <tr>
        <th scope="row">${index + 1}</th>
        <td>${taskList[index].task}</td>
        <td>
        ${
          taskListItem.iscompleted
            ? `<button class="btn btn-primary" onclick="iscomplete(${taskList[index].id})">Unfinished</button>`
            : `<button
              class="btn btn-primary"
              onclick="iscomplete(${taskList[index].id})"
            >
              Done
            </button>`
        } 
          
          <button class="btn btn-danger" onclick="deleteTask(${
            taskList[index].id
          })">Delete</button>
          <button class="btn btn-warning" onclick="editTask(${
            taskList[index].id
          })">Edit</button>
        </td>
        </tr>`;
    if (taskListItem.iscompleted) {
      activityComplete.innerHTML += template;
    } else {
      activities.innerHTML += template;
    }
  });
}

function deleteTask(id) {
  const array = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id !== id) {
      array.push(taskList[i]);
    }
  }
  taskList = array;
  render();
}

function iscomplete(id) {
  let array = [];
  for (let i = 0; i < taskList.length; i++) {
    if (i === id) {
      taskList[i].iscompleted = !taskList[i].iscompleted;
    }
    array.push(taskList[i]);
  }
  taskList = array;
  render();
}

const editTaskEl = document.querySelector("#editTask");
const editBtn = document.querySelector("#editSubmit");
const main = document.querySelector("#main");
const modal = document.querySelector(".modalInput");
let num;
function editTask(id) {
  main.classList.add("blur");
  modal.classList.remove("hidden");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      editTaskEl.value = taskList[i].task;
      num = i;
    }
  }
}

editBtn.addEventListener("click", () => {
  main.classList.remove("blur");
  modal.classList.add("hidden");
  taskList[num].task = editTaskEl.value;
  render();
});
