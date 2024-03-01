const TODO_CONTAINER = document.querySelector('.todo-container');
const MODAL_CONTAINER = document.getElementById('modalContainer');
const ADD_TODO_BTN = document.getElementById('add-todo');
const NEW_TODO_INPUT = document.getElementById('new-todo-input');
const EDIT_TODO_INPUT = document.getElementById('edit-todo-input');
const CANCEL_EDIT_BTN = document.getElementById('cancel-edit');
const SAVE_TODO_BTN = document.getElementById('save-todo');

function addTodo() {
	const todoText = NEW_TODO_INPUT.value.trim();
	if (todoText !== '') {
		const todoItem = createTodoItem(todoText);
		TODO_CONTAINER.appendChild(todoItem);
		NEW_TODO_INPUT.value = '';

		const deleteBtn = todoItem.querySelector('.delete-todo');
		deleteBtn.addEventListener('click', deleteTodo);

		const editBtn = todoItem.querySelector('.edit-todo');
		editBtn.addEventListener('click', () => editTodo(todoItem));
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
	currentEditTodoItem = todoItem;
}

function deleteTodo() {
	this.parentElement.remove();
}

function hideModal() {
	MODAL_CONTAINER.classList.add('hidden');
}

function saveTodo() {
	const editedTodoText = EDIT_TODO_INPUT.value.trim();
	if (editedTodoText !== '') {
		currentEditTodoItem.querySelector('.todo-text').textContent =
			editedTodoText;
		hideModal();
	}
}

function initialize() {
	ADD_TODO_BTN.addEventListener('click', (e) => {
		e.preventDefault();
		addTodo();
	});

	CANCEL_EDIT_BTN.addEventListener('click', hideModal);

	SAVE_TODO_BTN.addEventListener('click', saveTodo);
}

initialize();
