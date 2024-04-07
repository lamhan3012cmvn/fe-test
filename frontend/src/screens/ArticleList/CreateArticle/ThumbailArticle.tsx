import { Spin } from "antd";
import { useCallback, useState } from "react";
import {
  CMSDrawer,
  CMSGallery,
  CMSUploadMedia,
  HoverAction,
} from "~/components/common";
import { getImage } from "~/helpers/common.helper";
import { MediaModel } from "~/models/media.model";

export type IProps = {
  size?: "banner" | "thumbnail" | "gallery";
  onChange?: (_id: string) => void;
};
const ThumbnailArticle = (props: IProps) => {
  const { size = "banner" } = props;

  const [isShowGallery, setShowGallery] = useState(false);
  const [isShowUploadImage, setShowUploadImage] = useState(false);
  const [loading] = useState(false);

  const [imagePick, setImagePick] = useState<MediaModel | null>(null);

  const sizeBox = {
    banner: "w-full h-[320px]",
    thumbnail: "w-1/4 h-[320px]",
    gallery: "w-full h-[320px]",
  };

  const handleToggleOpen = useCallback(() => {
    setShowGallery(!isShowGallery);
  }, [isShowGallery]);

  const handleToggleUpload = useCallback(() => {
    setShowUploadImage(!isShowUploadImage);
  }, [isShowUploadImage]);

  return (
    <>
      <div className={sizeBox[size]}>
        <div className="w-full h-full rounded-md relative border group cursor-pointer max-w-[800px] m-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spin />
            </div>
          ) : (
            <>
              <img
                src={getImage(imagePick?.src)}
                alt={imagePick?.name}
                className="w-full h-full object-cover rounded-md"
              />
              <HoverAction
                action={{
                  label: "Upload image",
                  onClick: handleToggleUpload,
                }}
                action2={{
                  label: "Choose from gallery",
                  variant: "secondary",
                  onClick: handleToggleOpen,
                }}
              />
            </>
          )}
        </div>
      </div>

      <CMSDrawer visible={isShowGallery} onClose={handleToggleOpen} width={800}>
        <CMSGallery
          onSelect={(image) => {
            setImagePick(image);
            handleToggleOpen();
            if (props.onChange) props.onChange(image?._id);
          }}
        />
      </CMSDrawer>

      <CMSDrawer
        visible={isShowUploadImage}
        onClose={handleToggleUpload}
        width={800}
      >
        <CMSUploadMedia
          onUploadSuccess={(image) => {
            setImagePick(image);

            handleToggleUpload();
            if (props.onChange) props.onChange(image?._id);
          }}
        />
      </CMSDrawer>
    </>
  );
};

export default ThumbnailArticle;
