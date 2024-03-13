import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { TodoCreator } from './components/TodoCreator';
import { TodoList } from './components/TodoList';
import './App.css';

export const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className='todoAppContainer'>
					<h1>HAMLET</h1>
					<TodoCreator />
					<TodoList />
				</div>
			</PersistGate>
		</Provider>
	);
};
