import storage from "./storage";

const storageOperations = {
  save: async ({ key, data, id, expires }) => {
    try {
      if (typeof key !== "string") {
        throw new Error(`Key must be a string. Received: ${typeof key}`);
      }
      const jsonData = JSON.stringify(data);
      await storage.save({
        key,
        id,
        data: jsonData,
        expires,
      });
    } catch (error) {
      console.error(`Error saving data with key ${key}:`, error);
    }
  },

  load: async ({ key, id }) => {
    try {
      if (typeof key !== "string") {
        throw new Error(`Key must be a string. Received: ${typeof key}`);
      }
      const jsonData = await storage.load({
        key,
        id,
      });
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error(`Error loading data with key ${key}:`, error);
      throw error;
    }
  },

  remove: async ({ key, id }) => {
    try {
      if (typeof key !== "string") {
        throw new Error(`Key must be a string. Received: ${typeof key}`);
      }
      await storage.remove({
        key,
        id,
      });
    } catch (error) {
      console.error(`Error removing data with key ${key}:`, error);
    }
  },

  clearAll: async () => {
    try {
      await storage.clearMap();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },

  getAllKeys: async () => {
    try {
      const keys = await storage.getAllKeys();
      return keys;
    } catch (error) {
      console.error("Error getting all keys from storage:", error);
      throw error;
    }
  },
};


export default storageOperations;
