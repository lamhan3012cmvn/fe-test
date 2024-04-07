import { ReactNode } from "react";

interface IAction {
  variant?: "default" | "outline" | "secondary";
  label: ReactNode;
  onClick: () => void;
}

export interface IHoverAction {
  action: IAction;
  action2?: IAction;
}
