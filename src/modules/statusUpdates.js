import UI from './ui.js';

const ul = document.querySelector('.ul');

const handleStatusUpdate = () => {
  ul.addEventListener('change', (e) => {
    if (e.target.classList.contains('check')) {
      const taskId = e.target.id;
      let todoData = UI.getItem();

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

export default handleStatusUpdate;