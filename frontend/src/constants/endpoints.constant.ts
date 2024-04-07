const prefix = "/admin";

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  GET_CURRENT_USER: prefix + "/get-user-current",

  UPLOAD_FILE: prefix + "/media/upload",
  GET_GALLERY: prefix + "/media/get-gallery",

  CATEGORY: prefix + "/category",
  CATEGORY_PARENT: prefix + "/category/parent",

  ARTICLE: prefix + "/article",
};
