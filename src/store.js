import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';

export const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});
