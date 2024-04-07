import { CMSDrawer, CMSUploadMedia, PageHeader } from "~/components/common";
import { Button } from "~/components/ui/button";
import MediaItem from "./MediaItem/MediaItem.view";
import useCMSGallery from "./CMSGallery.hook";
import { MediaModel } from "~/models/media.model";
import { Spin } from "antd";
import { IGallery } from "./CMSGallery.props";

const Gallery = (props: IGallery) => {
  const { isLoading, data, isOpenUploadImage, toggleShowUploadImage } =
    useCMSGallery();

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="w-full">
          <PageHeader title="Gallery">
            <div className="w-full flex justify-end">
              <Button onClick={toggleShowUploadImage}>Upload media</Button>
            </div>
          </PageHeader>
          {/* <div className="w-full mb-5">
            <CMSFilter />
          </div> */}
          <p className="text-xs">
            Total: <strong>{data.length}</strong>
          </p>
        </div>

        <div className="grow overflow-auto mt-2">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {data.map((e: MediaModel) => (
                <MediaItem
                  image={e}
                  key={e._id}
                  onClick={() => {
                    if (props.onSelect) {
                      props.onSelect(e);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CMSDrawer visible={isOpenUploadImage} onClose={toggleShowUploadImage}>
        <CMSUploadMedia />
      </CMSDrawer>
    </>
  );
};

export default Gallery;
