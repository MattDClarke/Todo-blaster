const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.items');
const message = document.querySelector('.message');
let items = JSON.parse(localStorage.getItem('items-completed')) || [];
let todos = JSON.parse(localStorage.getItem('todos')) || [];

const deleteAllButton = addItems.querySelector('.delete-all');
const uncheckAllButton = addItems.querySelector('.uncheck-all');

const emojis = ['😀', '😁', '🎉', '✨', '🏆', '🎖', '😅', '😊', '😎'];

function randomElementFromArray(arr) {
  const element = arr[Math.floor(Math.random() * arr.length)];
  return element;
}

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;

  // prevent adding duplicates
  const isTodoPresent = items.some((o) => o.text === text);
  const isItemPresent = todos.some((o) => o.text === text);
  if (isTodoPresent || isItemPresent) {
    message.innerText = 'No duplicates allowed';
    setTimeout(() => {
      message.innerText = '';
    }, 3000);
    return;
  };

  const item = {
    id: Date.now(),
    text,
    done: false
  };
  todos.push(item);
  localStorage.setItem('todos', JSON.stringify(todos));
  // add to p5.js canvas
  asteroids.push(new Asteroid(null, null, text));

  this.reset();
}

function populateList(items = [], itemsList) {
  itemsList.innerHTML = items.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}  />
        <label for="item${i}" data-before="${randomElementFromArray(emojis)}">${item.text}</label>
        <button
          type="button"
          aria-label="Remove ${item.name}"
          value="${item.id}">
          &times;
        </button>
      </li>
    `;
  }).join('');
}

function toggleDoneOrDelete(e) {

  if (e.target.matches('button')) {
    const id = parseInt(e.target.value);
    return deleteItem(id);
  }
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  // get text
  const text = items[index].text;
  // remove item from items
  const newItems = items.filter(itm => itm.text !== text);
  items = newItems;
  localStorage.setItem('items-completed', JSON.stringify(items));
  populateList(items, itemsList);

  // add removed item back to todos
  const newTodo = {
    text,
    done: false
  };
  const newTodos = [...todos, newTodo];
  todos = newTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
  // add to p5.js canvas
  asteroids.push(new Asteroid(null, null, text));
}

function deleteItem(id) {
  // update state and display updated list
  items = items.filter(item => item.id !== id);
  localStorage.setItem('items-completed', JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteAll() {
  items = [];
  localStorage.setItem('items-completed', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDoneOrDelete);
deleteAllButton.addEventListener('click', deleteAll);

populateList(items, itemsList);