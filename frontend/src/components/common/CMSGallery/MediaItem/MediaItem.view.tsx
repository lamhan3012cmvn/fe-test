import { Image } from "antd";
import { useState } from "react";
import { IMediaItem } from "./MediaItem.props";
import OverlayAction from "./OverlayAction";
import { MEDIA_TYPE } from "~/constants/common.constant";
import { getImage } from "~/helpers/common.helper";

const MediaItem = (props: IMediaItem) => {
  const { image } = props;
  const { name } = image;
  const src = getImage(image.src);

  const [visible, setVisible] = useState(false);

  const onView = () => setVisible(true);

  return (
    <div
      className="w-full h-full min-h-[200px] min-w-[100px] rounded-md relative border group"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <OverlayAction
        image={props.image}
        onClick={props.onClick}
        onView={onView}
      />
      {image.type === MEDIA_TYPE.PICTURE ? (
        <Image
          style={{ display: "none" }}
          alt={name}
          src={src}
          preview={{
            visible,
            src,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
          rootClassName="imagePreview"
        />
      ) : null}
      {image.type === MEDIA_TYPE.PDF ? (
        <div className="w-full h-full bg-gray-2 flex justify-center items-center text-xl font-bold">
          PDF
        </div>
      ) : null}
    </div>
  );
};

export default MediaItem;
