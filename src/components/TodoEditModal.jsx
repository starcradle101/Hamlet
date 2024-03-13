import { useState } from 'react';
import style from '../styles/TodoEditModal.module.css';

const TodoEditModal = ({ closeModal, todoText, onEditSave }) => {
	const [editedText, setEditedText] = useState(todoText);
	const [showValidation, setShowValidation] = useState(false);

	const handleInputChange = (e) => {
		setEditedText(e.target.value);
	};

	const handleSaveClick = (e) => {
		e.preventDefault();

		if (editedText.trim() === '') {
			setShowValidation(true);
		} else {
			setShowValidation(false);
			onEditSave(editedText);
		}
	};

	const handleCancelClick = () => {
		closeModal();
	};

	return (
		<div className={`${style.modalContainer}`}>
			<div className={style.modalContent}>
				<div className={style.todoEditContainer}>
					<input
						type='text'
						value={editedText}
						onChange={handleInputChange}
						className={style.editTodoInput}
					/>
					{showValidation && (
						<span className={style.editValidation}>
							Please enter a todo item before edit.
						</span>
					)}
				</div>
				<div className={style.modalButtonContainer}>
					<button onClick={handleSaveClick} className={style.saveTodo}>
						Save
					</button>
					<button onClick={handleCancelClick} className={style.cancelEdit}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoEditModal();
