import { AdminModel } from "~/models";
import * as Types from "./auth.constant";

export const refreshUserCurrent = () => {
  return {
    type: Types.REFRESH_USER_CURRENT,
    payload: {},
  };
};

export const updateCurrentUser = (data: AdminModel | undefined) => {
  return {
    type: Types.UPDATE_USER_CURRENT,
    payload: data,
  };
};
