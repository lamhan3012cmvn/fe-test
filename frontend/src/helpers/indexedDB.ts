import { INDEXED_DB } from "~/constants/common.constant";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const isInValidWindow = () => typeof window === "undefined";

const _connectIndexedDB = async (tableName: string) => {
  const databaseName = INDEXED_DB.NAME;

  if (isInValidWindow() || !window.indexedDB) {
    return null;
  }

  const request = window.indexedDB.open(databaseName);
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      if (db.objectStoreNames.contains(tableName)) {
        return resolve(db);
      }

      const version = db.version + 1;
      db.close();
      const requestNew = window.indexedDB.open(databaseName, version);
      requestNew.onupgradeneeded = function (event: any) {
        const dbNew = event.target.result;
        dbNew.createObjectStore(tableName, {
          keyPath: "id",
          autoIncrement: true,
        });
        const transaction = event.target.transaction;
        transaction.oncomplete = () => resolve(dbNew);
      };
    };

    request.onerror = function (event: any) {
      reject(event.target.errorCode);
    };

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(tableName)) {
        db.createObjectStore(tableName, { keyPath: "id", autoIncrement: true });
      }
      const transaction = event.target.transaction;
      transaction.oncomplete = () => resolve(db);
    };
  });
};

export const indexedDatabase = (tableName: string) => {
  // CREATE
  const create = async ({ data }: { data: any }) => {
    const db: any = await _connectIndexedDB(tableName);
    if (!db) return null;

    const transaction = db.transaction(tableName, "readwrite");
    const objectStore = transaction.objectStore(tableName);
    const request = objectStore.add(data);

    return new Promise((resolve, reject) => {
      request.onsuccess = function () {
        resolve(true);
      };

      request.onerror = function (event: any) {
        reject(event.target.errorCode);
      };
    });
  };

  // FIND
  const findMany = async (conditions: Record<string, any>): Promise<any[]> => {
    const db: any = await _connectIndexedDB(tableName);
    if (!db) return [];
    const transaction = db.transaction(tableName, "readonly");
    const objectStore = transaction.objectStore(tableName);
    const request = objectStore.openCursor();

    const filters = (record: any) => {
      return Object.keys(conditions).every(
        (key) => conditions[key] === record[key]
      );
    };
    const result: any[] = [];
    return new Promise((resolve, reject) => {
      request.onsuccess = function (event: any) {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;

          if (filters(record)) {
            result.push(record);
          }

          cursor.continue();
        } else {
          resolve(result);
        }
      };

      request.onerror = function (event: any) {
        reject(event.target.error);
      };
    });
  };

  // DELETE
  const deleteMany = async (where: Record<string, any>) => {
    const db: any = await _connectIndexedDB(tableName);
    if (!db) return null;
    const transaction = db.transaction(tableName, "readwrite");
    const objectStore = transaction.objectStore(tableName);

    const filters = (record: any) => {
      if (Object.keys(where).length === 0) return false;
      return Object.keys(where).every((key) => where[key] === record[key]);
    };

    const request = objectStore.openCursor();

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event: any) {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;

          if (filters(record)) {
            const deleteRequest = cursor.delete();

            deleteRequest.onsuccess = function () {
              resolve(true);
            };

            deleteRequest.onerror = function (event: any) {
              reject(event.target.errorCode);
            };
          } else {
            cursor.continue();
          }
        } else {
          // NOT FOUND
          resolve(false);
        }
      };

      request.onerror = function (event: any) {
        reject(event.target.error);
      };
    });
  };

  // UPDATE
  const updateMany = async ({
    where,
    data,
  }: {
    where: Record<string, any>;
    data: any;
  }) => {
    const db: any = await _connectIndexedDB(tableName);
    if (!db) return null;
    const transaction = db.transaction(tableName, "readwrite");
    const objectStore = transaction.objectStore(tableName);

    const filters = (record: any) => {
      return Object.keys(where).every((key) => where[key] === record[key]);
    };

    const request = objectStore.openCursor();

    return new Promise((resolve, reject) => {
      request.onsuccess = function (event: any) {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;

          if (filters(record)) {
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                record[key] = data[key];
              }
            }

            const updateRequest = cursor.update(record);

            updateRequest.onsuccess = function () {
              resolve(true);
            };

            updateRequest.onerror = function (event: any) {
              reject(event.target.errorCode);
            };
          } else {
            cursor.continue();
          }
        } else {
          // NOT FOUND
          resolve(false);
        }
      };

      request.onerror = function (event: any) {
        reject(event.target.error);
      };
    });
  };

  return {
    create,
    findMany,
    deleteMany,
    updateMany,
  };
};
