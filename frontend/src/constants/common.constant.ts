export enum USER_ROLES {
  ADMIN = 1,
}

export enum MEDIA_TYPE {
  PICTURE = 1,
  PDF = 2,
}

export enum ELEMENT_STATUS {
  ACTIVE = 1,
  PENDING = 2,
  ARCHIVE = 3,
}

export const ELEMENT_STATUS_LIST = [
  { value: ELEMENT_STATUS.ACTIVE, label: "Active" },
  { value: ELEMENT_STATUS.PENDING, label: "Pending" },
  { value: ELEMENT_STATUS.ARCHIVE, label: "Archive" },
];

export const INDEXED_DB = {
  NAME: "APPEL99",
  TABLE: {},
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
