import './style.css';
import Todo from './modules/data.js';
import UI from './modules/ui.js';

const ui = new UI();
const form = document.querySelector('.form');
const clearButton = document.querySelector('.clearButton');

document.addEventListener('DOMContentLoaded', UI.displayFromLocalStorage);

// Add todo-list functionslity
form.addEventListener('submit', (e) => {
  const desc = document.querySelector('.desc').value;
  const newId = UI.getItem();
  let index;
  if (newId.length > 0) {
    index = newId[newId.length - 1].index + 1;
  } else {
    index = 0;
  }

  const completed = false;

  if (desc === '') {
    ui.errorMsg('Error', 'rgba(255, 0, 0, 0.5)');
  } else {
    // Initialize todo Data
    const newTodo = new Todo(index, desc, completed);

    // display data on UI
    ui.displayTask(newTodo);

    UI.addToLocalStorage(newTodo);

    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');

    document.querySelector('.desc').value = '';
  }
  e.preventDefault();
});

// clear all task
clearButton.addEventListener('click', UI.clearCompletedTasks);
