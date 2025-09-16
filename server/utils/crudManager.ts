export function crudManager<T>(array: T[], key: keyof T) {
  const simulateDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms * 10));

  return {
    create: async (item: T): Promise<T> => {
      await simulateDelay(300);
      const newItem = { ...item, id: array.length + 1 };
      array.push(newItem);
      return newItem;
    },

    read: async (filterFn?: (item: T) => boolean): Promise<T[]> => {
      await simulateDelay(200);
      if (typeof filterFn === "function") {
        return array.filter(filterFn);
      }
      return [...array];
    },

    async get(id: number): Promise<T | null> {
      const item = array.find((item) => item[key] === id);
      return item ? item : null;
    },

    update: async (id: T[keyof T], updatedItem: T): Promise<T | null> => {
      await simulateDelay(300);
      const index = array.findIndex((el) => el[key] === id);
      if (index === -1) {
        return null;
      }
      array[index] = { ...array[index], ...updatedItem };
      return array[index];
    },

    delete: async (id: T[keyof T]): Promise<T | null> => {
      await simulateDelay(300);
      const index = array.findIndex((el) => el[key] === id);
      if (index === -1) {
        return null;
      }
      const deletedItem = array.splice(index, 1)[0];

      return deletedItem ? deletedItem : null;
    },
  };
}
