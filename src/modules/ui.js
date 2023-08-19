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
    const list = document.querySelector('li');
    list.id = 'list';
    list.className = newTodo.index;
    const div = document.createElement('div');
    div.className = 'div';

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
      // update description on task
      newTodo.description = newInput.value;

      // update task in localstorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    newInput.addEventListener('focusin', () => {
      const allListItems = document.querySelectorAll('.ul li');
      allListItems.forEach((item) => {
        if (item === list) {
          item.classList.add('avtive');
          const trashIcon = item.querySelector('.fa-trash-alt');
          const ellipsisIcon = item.querySelector('.fa-ellipsis-v');
          trashIcon.classList.remove('hidden');
          ellipsisIcon.classList.add('hidden');
        }
      });

      // check is active is remove
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
          trashIcon.classList.remove('hidden');
          ellipsisIcon.classList.remove('hidden');
        }
      });
    });

    // Add event-listener to Authenticate if task is completed true or false
    const checkboxI = list.querySelector('.check');
    checkboxI.addEventListener('change', () => {
      // update the status of task
      newTodo.completed = !newTodo.completed;

      if (newTodo.completed === true) {
        input.classList.add('completed');
        checkbox.checked = true;
      } else {
        input.classList.remove('completed');
        checkbox.checked = false;
      }

      // update task in localStorage
      UI.updateTaskInLocalStorage(newTodo.index, newTodo);
    });

    // Add eventListener to delete Icon
    trashIcon.addEventListener('click', () => {
      const taskid = newTodo.index;

      // remove the task from UI
      ul.removeChild(list);

      // remove task from localstorage
      UI.deleteTaskFromLocalStorage(taskid);
    });
  }

  static addToLocalStorage(newTodo) {
    this.newTodo = newTodo;
    const todoData = UI.getItem();
    todoData.push(newTodo);
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }

  static updateTaskInLocalStorage(taskid, updatedTodo) {
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskid);
    if (taskIndex !== -1) {
      todoData[taskIndex] = updatedTodo;
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
  }

  static deleteTaskFromLocalStorage(taskid) {
    const ui = new UI();
    const todoData = UI.getItem();
    const taskIndex = todoData.findIndex((todo) => todo.index === taskid);
    if (taskIndex !== -1) {
      todoData.splice(taskIndex, 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
    ui.errorMsg('success', 'rgba(9, 186, 9, 0.5');
  }

  static clearCompletedTasks() {
    const todoData = UI.getItem();
    const ui = new UI();

    // Filter out completed task
    const incompleteTasks = todoData.filter((todo) => !todo.completed);

    // Update localstorage with incomplete task
    localStorage.setItem('todoData', JSON.stringify(incompleteTasks));

    // remove completed task
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach((task) => {
      const listItem = task.closest('li');
      listItem.parentNode.removeChild(listItem);
    });

    ui.errorMsg('success', 'rgba(9, 186, 9, 0.5)');
  }

  static displayFromLoacalStorage() {
    const ui = new UI();
    const todoList = UI.getItem();
    todoList.forEach((todo) => {
      ui.displayTask(todo);
    });
  }
}

export default UI;
