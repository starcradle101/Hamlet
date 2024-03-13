import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../features/todoSlice';
import TodoEditModal from './TodoEditModal';
import style from '../styles/TodoItem.module.css';

const TodoItem = ({ id, todoText, isComplete }) => {
	const [checked, setChecked] = useState(isComplete);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedText, setEditedText] = useState(todoText);
	const dispatch = useDispatch();

	const handleCheckboxChange = () => {
		setChecked(!checked);
		dispatch(toggleTodo(id));
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleDeleteButtonClick = () => {
		dispatch(deleteTodo(id));
	};

	const handleEditSave = (editedTodoText) => {
		setEditedText(editedTodoText);
		dispatch(updateTodo({ id: id, updatedTodoText: editedTodoText }));
		setIsModalOpen(false);
	};

	return (
		<div className={style.todoItemContainer}>
			<p
				className={
					isComplete ? `${style.todoText} ${style.completed}` : style.todoText
				}
			>
				{editedText}
			</p>
			<input
				type='checkbox'
				className={style.checkbox}
				checked={checked}
				onChange={handleCheckboxChange}
			/>
			<button className={style.editTodo} onClick={openModal}>
				Edit
			</button>
			<button className={style.deleteTodo} onClick={handleDeleteButtonClick}>
				Delete
			</button>
			{isModalOpen && (
				<TodoEditModal
					closeModal={closeModal}
					todoText={todoText}
					onEditSave={handleEditSave}
				/>
			)}
		</div>
	);
};

export default TodoItem();
