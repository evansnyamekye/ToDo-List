import './styles/style.css';
import Todo from './modules/data';
import UI from './modules/ui';

const ui = new UI();
const form = document.querySelector('.form');
const clearBtn = document.querySelector('.clearBtn');

document.addEventListener('DOMContentLoaded', UI.displayFromLocalStorage);

// Add todo list
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
    // Init todo data
    const newTodo = new Todo(index, desc, completed);

    // Display data on ui
    ui.displayTask(newTodo);

    UI.addToLocalStorage(newTodo);

    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');

    document.querySelector('.desc').value = '';
  }

  e.preventDefault();
});

// Clear all task
clearBtn.addEventListener('click', UI.clearCompletedTasks);
