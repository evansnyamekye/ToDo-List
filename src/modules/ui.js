class UI {
  errorMsg(message, color) {
    this.message = message;
    this.color = color;
    const msg = document.querySelector('.msg');
    msg.style.display = 'block';
    msg.innerText = message;
    msg.style.background = color;
    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  }

  static getItem() {
    let todoData;
    if (localStorage.getItem('todoData') === null) {
      todoData = [];
    } else {
      todoData = JSON.parse(localStorage.getItem('todoData'));
    }
    return todoData;
  }

  displayTask(newTodo) {
    this.newTodo = newTodo;
    const ul = document.querySelector('.ul');
    const list = document.createElement('li');
    list.id = 'list';
    list.className = newTodo.index;
    const div = document.createElement('div');
    div.className = 'divn';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = newTodo.index;
    checkbox.className = 'check';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = newTodo.index;
    input.className = 'edit';
    input.value = newTodo.description;

    if (newTodo.completed === true) {
      input.classList.add('completed');
      checkbox.checked = true;
    } else {
      input.classList.remove('completed');
      checkbox.checked = false;
    }

    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.id = 'bar';
    ellipsisIcon.className = 'fas fa-ellipsis-v';

    const trashIcon = document.createElement('i');
    trashIcon.id = 'remove';
    trashIcon.className = 'fas fa-trash-alt hidden';

    div.appendChild(checkbox);
    div.appendChild(input);

    list.appendChild(div);
    list.appendChild(ellipsisIcon);
    list.appendChild(trashIcon);
    ul.appendChild(list);

    const newInput = list.querySelector('.edit');
    newInput.addEventListener('input', () => {
      // Update the description of the task
      newTodo.description = newInput.value;

      // Update the task in the localStorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    newInput.addEventListener('focusin', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        if (item === list) {
          item.classList.add('active');
          const trashIcon = item.querySelector('.fa-trash-alt');
          const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
          trashIcon.classList.remove('hidden');
          ellipsisIcon.classList.add('hidden');
        }
      });

      // Check if the 'active' class is removed
      if (list.classList.contains('active')) {
        trashIcon.classList.remove('hidden');
        ellipsisIcon.classList.add('hidden');
      }
    });

    newInput.addEventListener('focusout', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        if (item !== list) {
          item.classList.remove('active');
          const trashIcon = item.querySelector('.fa-trash-alt');
          const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
          trashIcon.classList.add('hidden');
          ellipsisIcon.classList.remove('hidden');
        }
      });
    });

    // Add event listener to check if completed === true
    const checkboxI = list.querySelector('.check');
    checkboxI.addEventListener('change', () => {
      // Update the status of the task
      newTodo.completed = !newTodo.completed;

      if (newTodo.completed === true) {
        input.classList.add('completed');
        checkbox.checked = true;
      } else {
        input.classList.remove('completed');
        checkbox.checked = false;
      }

      // Update the task in the localStorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    // Add event listener to delete icon
    trashIcon.addEventListener('click', () => {
      const taskId = newTodo.index;

      // Remove the task from the UI
      ul.removeChild(list);

      // Remove the task from the localStorage
      UI.deleteTaskFromLocalStorage(taskId);
    });
  }

  static addToLocalStorage(newTodo) {
    this.newTodo = newTodo;
    const todoData = UI.getItem();
    todoData.push(newTodo);
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }

  static updateTaskInLocalStorage(taskId, updatedTodo) {
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskId);
    if (taskIndex !== -1) {
      todoData[taskIndex] = updatedTodo;
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
  }

  static deleteTaskFromLocalStorage(taskId) {
    const ui = new UI();
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskId);
    if (taskIndex !== -1) {
      todoData.splice(taskIndex, 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
  }

  static clearCompletedTasks() {
    const todoData = UI.getItem();
    const ui = new UI();

    // Filter out completed tasks
    const incompleteTasks = todoData.filter((todo) => !todo.completed);

    // Update localStorage with incomplete tasks
    localStorage.setItem('todoData', JSON.stringify(incompleteTasks));

    // Remove completed tasks from the UI
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach((task) => {
      const listItem = task.closest('li');
      listItem.parentNode.removeChild(listItem);
    });

    ui.errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
  }

  static displayFromLocalStorage() {
    const ui = new UI();
    const todoList = UI.getItem();
    todoList.forEach((todo) => {
      ui.displayTask(todo);
    });
  }
}

export default UI;