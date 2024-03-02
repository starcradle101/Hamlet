const TODO_CONTAINER = document.querySelector('.todo-container');
const MODAL_CONTAINER = document.getElementById('modal-container');
const ADD_TODO_BTN = document.getElementById('add-todo');
const NEW_TODO_INPUT = document.getElementById('new-todo-input');
const EDIT_TODO_INPUT = document.getElementById('edit-todo-input');
const CANCEL_EDIT_BTN = document.getElementById('cancel-edit');
const SAVE_TODO_BTN = document.getElementById('save-todo');

function loadItemsFromLocalStorage() {
	const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

	todoItems.forEach((item) => {
		const todoItem = createTodoItem(item.text);
		TODO_CONTAINER.appendChild(todoItem);
		addTodoItemEventListeners(todoItem);
	});
}

function saveItemInLocalStorage(text) {
	const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
	const newItem = { text };
	todoItems.push(newItem);
	localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function updateLocalStorage() {
	const todoItems = [];
	const todoTexts = document.querySelectorAll('.todo-text');
	todoTexts.forEach((todo) => {
		todoItems.push({ text: todo.textContent });
	});
	localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function addTodoItemEventListeners(todoItem) {
	const deleteBtn = todoItem.querySelector('.delete-todo');
	deleteBtn.addEventListener('click', deleteTodoItem);

	const editBtn = todoItem.querySelector('.edit-todo');
	editBtn.addEventListener('click', () => editTodo(todoItem));
}

function addTodo() {
	const todoText = NEW_TODO_INPUT.value.trim();
	if (todoText !== '') {
		const todoItem = createTodoItem(todoText);
		TODO_CONTAINER.insertBefore(todoItem);
		NEW_TODO_INPUT.value = '';
	}
}

function createTodoItem(text) {
	const todoItem = document.createElement('div');
	todoItem.classList.add('todo-item');
	todoItem.innerHTML = `
        <p class="todo-text">${text}</p>
        <input type="checkbox" class="checkbox" />
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
	updateLocalStorage();
}

function hideModal() {
	MODAL_CONTAINER.classList.add('hidden');
	TODO_CONTAINER.style.filter = '';
}

function saveTodoItem() {
	const editedTodoText = EDIT_TODO_INPUT.value.trim();
	if (editedTodoText !== '') {
		currentEditTodoItem.querySelector('.todo-text').textContent =
			editedTodoText;
		updateLocalStorage();
		hideModal();
	}
}

function initialize() {
	loadItemsFromLocalStorage();

	ADD_TODO_BTN.addEventListener('click', (e) => {
		e.preventDefault();
		const todoText = NEW_TODO_INPUT.value.trim();
		if (todoText !== '') {
			const todoItem = createTodoItem(todoText);
			TODO_CONTAINER.appendChild(todoItem);
			addTodoItemEventListeners(todoItem);
			saveItemInLocalStorage(todoText);
			NEW_TODO_INPUT.value = '';
		}
	});

	CANCEL_EDIT_BTN.addEventListener('click', hideModal);

	SAVE_TODO_BTN.addEventListener('click', saveTodoItem);
}

initialize();
