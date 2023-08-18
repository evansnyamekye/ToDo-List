// import _ from 'lodash';
// import './style.css';

// function component() {
//     const element = document.createElement('div');

// Lodash, currently included via a script, is required for this line to work
// Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     element.classList.add('hello');

//     return element;
//   }

//   document.body.appendChild(component());
import './style.css';
import todoData from './modules/data.js';

const ul = document.querySelector('.ul');

function displayTask() {
  todoData.forEach((data) => {
    const list = document.createElement('li');
    list.innerHTML = `
      <div><input type="checkbox" id="check">
        <p>${data.description}</p>
      </div>
      <i class="fas fa-ellipsis-v"></i>
    `;
    ul.appendChild(list);
  });
}

document.addEventListener('DOMContentLoaded', displayTask);