import ChooseAction from "./ChooseAction";

type OverlayActionProps = {
  image: any;
  onClick: (image: any) => void;
  onView?: (image: any) => void;
};

const OverlayAction = (props: OverlayActionProps) => {
  const { image, onClick, onView } = props;

  const handleClickImage = () => {
    onClick(image);
  };

  const handleClickView = () => {
    if (onView) onView(image);
  };
  return (
    <div
      className="
        overflow-hidden
        absolute top-0 left-0 
        w-full h-full
        rounded-md  
        transition-all duration-300 ease-in-out
        "
    >
      <div
        className="
        relative
        w-full h-full
        rounded-md
        before:content after:content
        before:absolute after:absolute
        before:top-0 after:top-0
        before:left-0 after:left-0
        after:bg-black after:opacity-60 after:w-full after:h-0
        transition-all duration-300 ease-in-out
        group-hover:before:w-full group-hover:after:h-full
      "
      ></div>
      <div
        className="
        hidden
        absolute top-0 left-0 
        w-full h-full
        items-center justify-center
        group-hover:flex
        "
      >
        <ChooseAction
          onClick={handleClickImage}
          onClickView={handleClickView}
        />
      </div>
    </div>
  );
};

export default OverlayAction;
