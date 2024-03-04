import {
	loadFromLocalStorage,
	addItemToLocalStorage,
	updateItemInLocalStorage,
	deleteItemFromLocalStorage,
} from './modules/storage.js';

const TODO_CONTAINER = document.querySelector('.todo-container');
const MODAL_CONTAINER = document.getElementById('modal-container');
const ADD_TODO_BTN = document.getElementById('add-todo');
const TODO_ADD_VALIDATION = document.querySelector('.add-validation');
const NEW_TODO_INPUT = document.getElementById('new-todo-input');
const EDIT_TODO_INPUT = document.getElementById('edit-todo-input');
const TODO_EDIT_VALIDATION = document.getElementById('edit-validation');
const CANCEL_EDIT_BTN = document.getElementById('cancel-edit');
const SAVE_TODO_BTN = document.getElementById('save-todo');
const TODO_FILTER_ALL = document.querySelector('.all');
const TODO_FILTER_FINISHED = document.querySelector('.finished');
const TODO_FILTER_UNFINISHED = document.querySelector('.unfinished');
let currentEditTodoItem = null;

function generateUniqueId() {
	return Date.now().toString(36);
}

function isInputEmpty(element) {
	return element.value.trim() === '';
}

function loadItemsFromLocalStorage() {
	const todoItems = loadFromLocalStorage('todoItems');
	const fragment = document.createDocumentFragment();

	todoItems.forEach((item) => {
		const todoItem = createTodoItem(item.text, item.isComplete, item.id);
		addTodoItemEventListeners(todoItem);
		if (item.isComplete) {
			todoItem.querySelector('.todo-text').style.textDecoration =
				'line-through';
			todoItem.querySelector('.checkbox').checked = true;
		}
		fragment.appendChild(todoItem);
	});

	TODO_CONTAINER.appendChild(fragment);
}

function saveItemInLocalStorage(todoItem, isComplete = false) {
	const newItem = {
		id: todoItem.getAttribute('data-id'),
		text: todoItem.querySelector('.todo-text').textContent,
		isComplete,
	};

	addItemToLocalStorage('todoItems', newItem);
}

function updateLocalStorage(itemId, newText) {
	updateItemInLocalStorage('todoItems', itemId, { text: newText });
}

function updateItemStatus(itemId, isComplete) {
	updateItemInLocalStorage('todoItems', itemId, { isComplete });
}

function addTodoItemEventListeners(todoItem) {
	const deleteBtn = todoItem.querySelector('.delete-todo');
	deleteBtn.addEventListener('click', deleteTodoItem);

	const editBtn = todoItem.querySelector('.edit-todo');
	editBtn.addEventListener('click', () => editTodo(todoItem));

	const checkbox = todoItem.querySelector('.checkbox');
	checkbox.addEventListener('change', () => {
		const itemId = todoItem.getAttribute('data-id');
		const isComplete = checkbox.checked;
		updateItemStatus(itemId, isComplete);

		if (isComplete) {
			todoItem.querySelector('.todo-text').style.textDecoration =
				'line-through';
		} else {
			todoItem.querySelector('.todo-text').style.textDecoration = 'none';
		}
	});
}

function createTodoItem(text, isComplete = false, id) {
	const todoItem = document.createElement('div');
	todoItem.classList.add('todo-item');
	todoItem.setAttribute('data-id', id || generateUniqueId());
	todoItem.innerHTML = `
  <p class="todo-text">${text}</p>
  <input type="checkbox" class="checkbox" ${isComplete ? 'checked' : ''} />
  <button class="edit-todo">Edit</button>
  <button class="delete-todo">Delete</button>
  `;
	return todoItem;
}

function editTodo(todoItem) {
	const todoText = todoItem.querySelector('.todo-text').textContent;
	EDIT_TODO_INPUT.value = todoText;
	MODAL_CONTAINER.classList.remove('hidden');
	TODO_CONTAINER.style.filter = 'blur(4px)';
	currentEditTodoItem = todoItem;
}

function deleteTodoItem() {
	this.parentElement.remove();
	const itemId = this.parentElement.getAttribute('data-id');
	deleteItemFromLocalStorage('todoItems', itemId);
}

function hideModal() {
	MODAL_CONTAINER.classList.add('hidden');
	TODO_EDIT_VALIDATION.style.display = 'none';
	TODO_CONTAINER.style.filter = '';
}

function saveTodoItem() {
	const editedTodoText = EDIT_TODO_INPUT.value.trim();
	if (isInputEmpty(EDIT_TODO_INPUT)) {
		TODO_EDIT_VALIDATION.style.display = 'inline';
		return;
	} else {
		TODO_EDIT_VALIDATION.style.display = 'none';
	}
	const itemId = currentEditTodoItem.getAttribute('data-id');
	currentEditTodoItem.querySelector('.todo-text').textContent = editedTodoText;
	updateLocalStorage(itemId, editedTodoText);
	hideModal();
}

function filterTodoItems(event) {
	const filterType = event.target.className;
	const todoItems = TODO_CONTAINER.querySelectorAll('.todo-item');
	todoItems.forEach((todoItem) => {
		const isComplete = todoItem.querySelector('.checkbox').checked;
		let displayStyle = 'flex';
		if (
			(filterType === 'finished' && !isComplete) ||
			(filterType === 'unfinished' && isComplete)
		) {
			displayStyle = 'none';
		}
		todoItem.style.display = displayStyle;
	});
}

function initialize() {
	loadItemsFromLocalStorage();
	TODO_FILTER_ALL.addEventListener('click', filterTodoItems);
	TODO_FILTER_FINISHED.addEventListener('click', filterTodoItems);
	TODO_FILTER_UNFINISHED.addEventListener('click', filterTodoItems);
	ADD_TODO_BTN.addEventListener('click', (e) => {
		e.preventDefault();

		if (isInputEmpty(NEW_TODO_INPUT)) {
			TODO_ADD_VALIDATION.style.display = 'inline';
			return;
		} else {
			TODO_ADD_VALIDATION.style.display = 'none';
		}

		const todoText = NEW_TODO_INPUT.value.trim();
		const todoItem = createTodoItem(todoText);
		TODO_CONTAINER.appendChild(todoItem);
		addTodoItemEventListeners(todoItem);
		saveItemInLocalStorage(todoItem);
		NEW_TODO_INPUT.value = '';
	});
	CANCEL_EDIT_BTN.addEventListener('click', hideModal);
	SAVE_TODO_BTN.addEventListener('click', saveTodoItem);
}

initialize();
