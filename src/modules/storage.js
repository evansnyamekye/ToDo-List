const errorMsg = (message, color) => {
  const msg = document.querySelector('.msg');
  msg.style.display = 'block';
  msg.innerText = message;
  msg.style.background = color;
  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
};

const getItems = () => {
  let tasks;
  if (localStorage.getItem('todoList') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('todoList'));
  }
  return tasks;
};

const saveToLocalStorage = (newTodo) => {
  const todoList = getItems();
  todoList.push(newTodo);
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

const updateItemInLocalStorage = (index, updateItem) => {
  const todoList = getItems();
  const itemIndex = todoList.findIndex((item) => item.index === index);

  if (itemIndex !== -1) {
    todoList[itemIndex] = updateItem;
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
};

const deleteNow = (taskId) => {
  let todoData = getItems();
  // Filter out the task to be deleted and update the index of remaining tasks
  todoData = todoData.filter((todo) => todo.index !== taskId).map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });
  // Update the localStorage with the updated todoData
  localStorage.setItem('todoList', JSON.stringify(todoData));
  errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
};

const clearCompletedTasks = () => {
  const todoData = getItems();

  // Filter out completed tasks and update the index of remaining tasks
  const newTodoData = todoData.filter((todo) => !todo.completed).map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });

  // Update the localStorage with the incomplete tasks
  localStorage.setItem('todoList', JSON.stringify(newTodoData));

  // Remove completed tasks from the UI
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach((task) => {
    const listItem = task.closest('li');
    listItem.parentNode.removeChild(listItem);
  });

  errorMsg('Success', 'rgba(9, 186, 9, 0.5)');
};

const ul = document.querySelector('.ul');

const handleStatusUpdate = () => {
  ul.addEventListener('change', (e) => {
    if (e.target.classList.contains('check')) {
      const taskId = e.target.id;
      let todoData = getItems();

      // Filter out the task with the specified taskId and update its completed status
      todoData = todoData.filter((todo) => {
        if (todo.index === taskId) {
          todo.completed = e.target.checked;
        }
        return todo;
      });

      // Update the task in the localStorage
      localStorage.setItem('todoData', JSON.stringify(todoData));

      // Update the completed class on the input element
      const input = e.target.nextElementSibling;
      if (e.target.checked) {
        input.classList.add('completed');
      } else {
        input.classList.remove('completed');
      }
    }
  });
};

export {
  getItems, updateItemInLocalStorage, saveToLocalStorage,
  deleteNow, errorMsg, clearCompletedTasks, handleStatusUpdate,
};