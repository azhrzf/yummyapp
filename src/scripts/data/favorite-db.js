import {openDB} from 'idb';

const dbName = 'yummy-db';
const storeName = 'yummy-store';

// Open the database and create the object store
const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(storeName);
  },
});

// Add an item to the object store
const addItem = async (key, value) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  tx.store.add(value, key);
  await tx.done;
};

// Get an item from the object store
const getItem = async (key) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readonly');
  const value = await tx.store.get(key);
  return value;
};

// Get all items from the object store
const getAllItems = async () => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readonly');
  const items = await tx.store.getAll();
  return items;
};

// Delete an item from the object store
const deleteItem = async (key) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  tx.store.delete(key);
  await tx.done;
};

export {addItem, getItem, getAllItems, deleteItem};
