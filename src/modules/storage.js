function loadFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

function addItemToLocalStorage(key, newItem) {
	const items = loadFromLocalStorage(key);
	items.push(newItem);
	saveToLocalStorage(key, items);
}

function updateItemInLocalStorage(key, itemId, newData) {
	const items = loadFromLocalStorage(key);
	const index = items.findIndex((item) => item.id === itemId);
	if (index !== -1) {
		items[index] = { ...items[index], ...newData };
		saveToLocalStorage(key, items);
	}
}

function deleteItemFromLocalStorage(key, itemId) {
	const items = loadFromLocalStorage(key);
	const filteredItems = items.filter((item) => item.id !== itemId);
	saveToLocalStorage(key, filteredItems);
}

export {
	loadFromLocalStorage,
	saveToLocalStorage,
	addItemToLocalStorage,
	updateItemInLocalStorage,
	deleteItemFromLocalStorage,
};
