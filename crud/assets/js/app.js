
import { removeTask, addTask, getAllUsers, fetchTasksByUser, fetchTask, updateTask } from './petitions.js';

const taskTable = document.getElementById('tasks');
const listUsers = document.getElementById('users');
const submitButton = document.getElementById('submitBtn');
const formTitle = document.getElementById('form-title');
const taskForm = document.getElementById('form-task');
const completedCheckbox = document.getElementById('completed');

let clickedBtnId;
let isInsertion = true;

document.addEventListener('DOMContentLoaded', async () => {
  const users = await getAllUsers();

  let userTemplate = listUsers.innerHTML;

  for (const user of users) {
    userTemplate += `
      <option value="${user.id}">${user.fullname}</option>
      `;
  }
  listUsers.innerHTML = userTemplate;
});

listUsers.addEventListener('change', async () => {
  const userTasks = await fetchTasksByUser(listUsers.value);

  let template = "";
  const tableBody = taskTable.children[1];
  for (const task of userTasks) {
    let taskStatus = "Not completed";
    if (task.completed) {
      taskStatus = "Completed";
    }
    template = template + `
      <tr id=tablerow${task.id}>
        <td>${task.id}</td>
        <td>${task.firstname}</td>
        <td>${task.title}</td>
        <td>${taskStatus}</td>
        <td>
          <button class="btn btn-secondary btn-sm updateBtn">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = template;

  addDeleteButtonEvents();
  addUpdateButtonEvents();
  submitButton.innerText = "SAVE";
  formTitle.innerText = "Insert Task";
  isInsertion = true;
  taskForm.children[0].children[0].value = ``;
});

function addDeleteButtonEvents() {
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.parentElement.parentElement.children[0].innerText;
      button.parentElement.parentElement.remove();
      await removeTask(taskId);
    });
  });
}

function addUpdateButtonEvents() {
  taskTable.addEventListener('click', async (e) => {
    if (e.target.classList.contains('updateBtn')) {
      e.preventDefault();
      const button = e.target;
      const taskId = button.parentElement.parentElement.children[0].innerText;
      const taskInfo = await fetchTask(taskId);
      let checkedBox;
      clickedBtnId = taskId;
      taskInfo.completed === true ? checkedBox = 'true' : checkedBox = '';
      taskForm.children[0].children[0].value = `${taskInfo.title}`;
      formTitle.innerText = "Modify Task";
      taskForm.children[2].children[0].checked = checkedBox;
      submitButton.innerText = "UPDATE";
      isInsertion = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}


taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const completedValue = completedCheckbox.checked ? parseInt(1) : parseInt(0);
  formData.append('completed', completedValue);

  if (isInsertion == true) {
    try {
      const response = await addTask(formData);
      if (response.success) {
        const taskInfo = await fetchTask(response.taskId);

        const newRow = document.createElement('tr');
        newRow.setAttribute("id", `tablerow${taskInfo.id}`);
        let taskStatus = "Not completed";
        if (taskInfo.completed) {
          taskStatus = "Completed";
        }
        newRow.innerHTML = `
          <td>${taskInfo.id}</td>
          <td>${taskInfo.firstname}</td>
          <td>${taskInfo.title}</td>
          <td>${taskStatus}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;
        taskTable.children[1].appendChild(newRow);

        addUpdateButtonEvents();
        taskForm.children[0].children[0].value = ``;
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error in Adding:', error);
    };
  };

  if (isInsertion == false) {
    try {
      const response = await updateTask(formData, clickedBtnId)
      if (response.success) {
        const rowToUpdate = document.getElementById(`tablerow${clickedBtnId}`);
        const taskInfo = await fetchTask(clickedBtnId);
        let taskStatus = "Not completed";
        if (taskInfo.completed) {
          taskStatus = "Completed";
        };
        rowToUpdate.innerHTML = `
          <td>${clickedBtnId}</td>
          <td>${taskInfo.firstname}</td>
          <td>${taskInfo.title}</td>
          <td>${taskStatus}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;
        formTitle.innerText = "Insert Task";
        submitButton.innerText = "SAVE";
        isInsertion = true;
        taskForm.children[0].children[0].value = ``;

      } else {
        console.error("Response unsuccessful, failed to update task")
      }
    } catch (error) {
      console.error('Error in UPDATING:', error);
    }
  };

  addDeleteButtonEvents();
  addUpdateButtonEvents();
});
