import { Provider } from 'react-redux';
import { store } from './store';
import { TodoCreator } from './components/TodoCreator';
import { TodoList } from './components/TodoList';
import './App.css';

export const App = () => {
	return (
		<Provider store={store}>
			<div className='todoAppContainer'>
				<h1>HAMLET</h1>
				<TodoCreator />
				<TodoList />
			</div>
		</Provider>
	);
};
