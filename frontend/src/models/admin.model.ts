import { USER_ROLES } from "~/constants/common.constant";

export type AdminModel = {
  email: string;
  fullname: string;
  role: USER_ROLES;
};
