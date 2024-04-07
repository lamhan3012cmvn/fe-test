import React from "react";
import { cn } from "~/helpers/common.helper";

interface IProps {
  title: string;
  children?: React.ReactNode;
  disableMaxWidth?: boolean;
}
const WidgetSection = (props: IProps) => {
  const classWrapper = cn("w-full", {
    "max-w-[500px]": !props.disableMaxWidth,
  });

  return (
    <div className={classWrapper}>
      <p className="text-xl font-bold">{props.title}</p>
      <div className="w-full flex flex-col mt-3 items-start gap-4">
        {props.children}
      </div>
    </div>
  );
};

export default WidgetSection;
