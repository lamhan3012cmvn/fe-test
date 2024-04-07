import { AdminModel } from "~/models/admin.model";
export interface IAuth {
  user: AdminModel | undefined;
}

export interface IAction {
  type: string;
  payload: any;
}
