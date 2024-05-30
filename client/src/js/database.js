
import { openDB } from 'idb';

// The global constant for our database name, it needs to be cool so we dont mess up.
const DB_NAME = "TexRexDb"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('TexRexDb database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('TexRexDb database created');
    },
  });


// === This data will update content and save it to DB. 
export const putDb = async (content) => {
  
  // variable for the open
  const openTex = await openDB(DB_NAME, 1);

  // The variable for the transaction
  const writeTex = openTex.transaction(DB_NAME, 'readwrite');

  // The variable for the store
  const nest = writeTex.objectStore(DB_NAME);

  const request = nest.put({ id: 1, value: content });
  const result = await request;
  console.log('🦖 - data saved to the database', result.value);
};

// === Get all content from DB.
export const getDb = async () => {
   const openTex = await openDB(DB_NAME, 1);
   const writeTex = openTex.transaction(DB_NAME, 'readonly');
   const nest = writeTex.objectStore(DB_NAME);

  const request = nest.get(1);
  const result = await request;
  result
    ? console.log('🦖 - data retrieved from the database', result.value)
    : console.log('🦖 - data not found in the database');

  return result?.value;
};

initdb();
