import { useCallback, useState } from "react";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { useReactQuery } from "~/hooks";

const useCMSGallery = () => {
  const [isOpenUploadImage, setOpenUploadImage] = useState(false);

  const toggleShowUploadImage = useCallback(() => {
    setOpenUploadImage(!isOpenUploadImage);
  }, [isOpenUploadImage]);

  const { isLoading, data = [] } = useReactQuery({
    queryKey: ["get-gallery"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.GET_GALLERY);

      console.log("response: ", response);
      if (response?.error) {
        return [];
      }

      return response?.data;
    },
  });

  return { isLoading, data, isOpenUploadImage, toggleShowUploadImage };
};

export default useCMSGallery;
