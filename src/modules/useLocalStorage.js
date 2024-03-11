function useLocalStorage(key, initialValue = []) {
	const loadFromLocalStorage = () => {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : initialValue;
	};

	const saveToLocalStorage = (data) => {
		localStorage.setItem(key, JSON.stringify(data));
	};

	const addItemToLocalStorage = (newItem) => {
		const items = loadFromLocalStorage();
		items.push(newItem);
		saveToLocalStorage(items);
	};

	const updateItemInLocalStorage = (itemId, newData) => {
		const items = loadFromLocalStorage();
		const updatedItems = items.map((item) =>
			item.id === itemId ? { ...item, ...newData } : item
		);
		saveToLocalStorage(updatedItems);
	};

	const deleteItemFromLocalStorage = (itemId) => {
		const items = loadFromLocalStorage();
		const filteredItems = items.filter((item) => item.id !== itemId);
		saveToLocalStorage(filteredItems);
	};

	return {
		loadFromLocalStorage,
		saveToLocalStorage,
		addItemToLocalStorage,
		updateItemInLocalStorage,
		deleteItemFromLocalStorage,
	};
}

export default useLocalStorage;
