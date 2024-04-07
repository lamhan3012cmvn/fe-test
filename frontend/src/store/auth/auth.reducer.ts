import * as Types from "./auth.constant";
import { IAction, IAuth } from "./auth.interface";

const initState: IAuth = {
  user: undefined,
};

export default function authReducer(state = initState, action: IAction) {
  const { type, payload } = action || {};

  switch (type) {
    case Types.UPDATE_USER_CURRENT:
      return { ...state, user: payload };

    default:
      return state;
  }
}
