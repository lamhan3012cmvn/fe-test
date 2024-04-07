const prefix = "/admin";

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",

  GET_CURRENT_USER: "/get-user-current",

  UPLOAD_FILE: "/media/upload",
  GET_GALLERY: "/media/get-gallery",

  CATEGORY: "/category",
  CATEGORY_PARENT: "/category/parent",

  ARTICLE: "/post/linked",
  ARTICLE_LIST: "/post/linked/list",

  // LinkedIn
  CHECK_AUTH_LINKEDIN: "linkedIn/authenticated"
};
