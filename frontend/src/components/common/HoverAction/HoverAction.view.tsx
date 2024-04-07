import { Button } from "~/components/ui/button";
import { IHoverAction } from "./HoverAction.props";

const HoverAction = (props: IHoverAction) => {
  const { action, action2 } = props;
  return (
    <div className="overflow-hidden absolute top-0 left-0 w-full h-full rounded-md transition-all duration-300 ease-in-out">
      <div
        className="
            relative
            w-full h-full
            rounded-md
            after:content
            after:absolute
            after:top-0
            after:left-0
            after:bg-black after:opacity-50 after:w-full after:h-full after:max-h-0
            transition-all duration-300 ease-in-out
            group-hover:after:max-h-dvh
        "
      ></div>
      <div
        className="
        hidden
        absolute top-0 left-0 
        w-full h-full
        items-center justify-center
        group-hover:flex
        flex flex-col gap-2
        px-3
        "
      >
        {action && (
          <Button
            type="button"
            variant={action.variant}
            onClick={action.onClick}
            className="w-full max-w-[250px]"
          >
            {action.label}
          </Button>
        )}

        {action2 && (
          <Button
            type="button"
            variant={action2.variant}
            onClick={action2.onClick}
            className="w-full max-w-[250px]"
          >
            {action2.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HoverAction;
