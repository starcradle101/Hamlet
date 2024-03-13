import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	todos: [],
};

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		updateTodo: (state, action) => {
			const { id, updatedTodoText } = action.payload;
			const todoToUpdate = state.todos.find((todo) => todo.id === id);
			if (todoToUpdate) {
				todoToUpdate.todoText = updatedTodoText;
			}
		},
		toggleTodo: (state, action) => {
			const todoId = action.payload;
			const todo = state.todos.find((todo) => todo.id === todoId);
			if (todo) {
				todo.isComplete = !todo.isComplete;
			}
		},
	},
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } =
	todoSlice.actions;

export default todoSlice.reducer;
