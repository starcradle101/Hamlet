import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import style from '../styles/TodoCreator.module.css';

const TodoCreator = () => {
	const [inputText, setInputText] = useState('');
	const [showValidation, setShowValidation] = useState(false);
	const dispatch = useDispatch();

	const handleAddButton = (e) => {
		e.preventDefault();

		if (inputText.trim() === '') {
			setShowValidation(true);
		} else {
			dispatch(
				addTodo({
					id: Date.now(),
					todoText: inputText,
					isComplete: false,
				})
			);
			setInputText('');
			setShowValidation(false);
		}
	};

	return (
		<form onSubmit={handleAddButton} className={style.todoCreator}>
			<div className={style.todoInputContainer}>
				<input
					type='text'
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className={style.newTodoInput}
					placeholder='Todo or not Todo?'
				/>
				{showValidation && (
					<span className={style.todoAddValidation}>
						Please enter a todo item before addition.
					</span>
				)}
			</div>
			<button type='submit' className={style.addTodo}>
				Add
			</button>
		</form>
	);
};

export default TodoCreator;
