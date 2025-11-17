import localForage from "localforage";

const DB_NAME = "aspire-db";

const getDBInstance = (storeName: string) => {
  const DB = localForage.createInstance({
    name: DB_NAME,
    storeName,
  });
  return {
    getItem: <T>(key: string) => DB.getItem<T>(key),
    setItem: <T>(key: string, value: T) => DB.setItem<T>(key, value),
    removeItem: (key: string) => DB.removeItem(key),
    clear: () => DB.clear(),
  };
};

export const aspireDB = getDBInstance("aspire-db-store");

export const dropClientDB = () => {
  localForage.dropInstance({
    name: DB_NAME,
  });
};
