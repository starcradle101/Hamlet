function addTodo() {
	const todoText = newTodoInput.value.trim();
	if (todoText !== '') {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		todoItem.innerHTML = `
          <p class="todo-text">${todoText}</p>
          <input type="checkbox" class="checkbox" />
          <button class="edit-todo">Edit</button>
          <button class="delete-todo">Delete</button>
      `;
		todoContainer.appendChild(todoItem);
		newTodoInput.value = '';

		const deleteBtn = todoItem.querySelector('.delete-todo');
		deleteBtn.addEventListener('click', deleteTodo);

		const editBtn = todoItem.querySelector('.edit-todo');
		editBtn.addEventListener('click', () => {
			editTodo(todoItem);
		});
	}
}

function editTodo(todoItem) {
	const todoText = todoItem.querySelector('.todo-text').textContent;
	editTodoInput.value = todoText;
	modalContainer.classList.remove('hidden');
	currentEditTodoItem = todoItem;
}

function deleteTodo() {
	this.parentElement.remove();
}

function hideModal() {
	modalContainer.classList.add('hidden');
}

function initialize() {
	addTodoBtn.addEventListener('click', (e) => {
		e.preventDefault();
		addTodo();
	});

	cancelEditBtn.addEventListener('click', hideModal);

	saveTodoBtn.addEventListener('click', () => {
		const editedTodoText = editTodoInput.value.trim();
		if (editedTodoText !== '') {
			currentEditTodoItem.querySelector('.todo-text').textContent =
				editedTodoText;
			hideModal();
		}
	});
}

const addTodoBtn = document.getElementById('add-todo');
const todoContainer = document.querySelector('.todo-container');
const newTodoInput = document.getElementById('new-todo-input');
const modalContainer = document.getElementById('modalContainer');
const editTodoInput = document.getElementById('edit-todo-input');
const cancelEditBtn = document.getElementById('cancel-edit');
const saveTodoBtn = document.getElementById('save-todo');
let currentEditTodoItem;

initialize();
