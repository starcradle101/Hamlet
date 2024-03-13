import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';
import style from '../styles/TodoList.module.css';

export const TodoList = () => {
	const [filterType, setFilterType] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const todos = useSelector((state) => state.todos.todos);

	const handleFilterButtonClick = (type) => {
		setFilterType(type);
	};

	const filterTodos = () => {
		let filteredList = [];

		switch (filterType) {
			case 'all':
				filteredList = todos;
				break;
			case 'finished':
				filteredList = todos.filter((todo) => todo.isComplete);
				break;
			case 'unfinished':
				filteredList = todos.filter((todo) => !todo.isComplete);
				break;
			default:
				filteredList = todos;
		}

		setFilteredTodos(filteredList);
	};

	useEffect(() => {
		filterTodos();
	}, [filterType, todos]);

	return (
		<div>
			<div className={`${style.todoFilter}`}>
				<button
					onClick={() => handleFilterButtonClick('all')}
					className={filterType === 'all' ? style.selected : ''}
				>
					All
				</button>
				<span>/</span>
				<button
					onClick={() => handleFilterButtonClick('finished')}
					className={filterType === 'finished' ? style.selected : ''}
				>
					Finished
				</button>
				<span>/</span>
				<button
					onClick={() => handleFilterButtonClick('unfinished')}
					className={filterType === 'unfinished' ? style.selected : ''}
				>
					Unfinished
				</button>
			</div>
			{filteredTodos.map((todo) => (
				<TodoItem
					key={todo.id}
					id={todo.id}
					todoText={todo.todoText}
					isComplete={todo.isComplete}
				/>
			))}
		</div>
	);
};
