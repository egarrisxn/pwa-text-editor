import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  try {
    const tx = jateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    await store.put({ value: content }); // Remove the predefined ID
    await tx.done; // Ensure the transaction is complete
    console.log("Your data was saved to the database!");
  } catch (error) {
    console.error("Error saving data to the database:", error);
  } finally {
    await jateDB.close(); // Close the database connection
  }
};

export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  try {
    const tx = jateDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const result = await store.getAll();
    console.log("Your data was read:", result);
    return result;
  } catch (error) {
    console.error("Error reading data from the database:", error);
  } finally {
    await jateDB.close(); // Close the database connection
  }
};

initdb();
