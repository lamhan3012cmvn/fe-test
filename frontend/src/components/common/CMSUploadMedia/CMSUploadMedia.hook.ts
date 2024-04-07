import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { uploadMediaSchema } from "~/helpers/schemaValidation.helper";
import { useFormData, useReactMutation } from "~/hooks";
import { ICMSUploadMedia } from "./CMSUploadMedia.props";

const useCMSUploadMedia = (props: ICMSUploadMedia) => {
  const queryClient = useQueryClient();

  const mutation = useReactMutation({
    mutationFn: async (body: any) => {
      const response = await axiosCore.post(ENDPOINTS.UPLOAD_FILE, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response?.message,
        });

        return;
      }

      message.success({
        className: "messagePosition",
        content: "Upload success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-gallery"] });
      if (props.onUploadSuccess) props.onUploadSuccess(response?.data);
    },
  });

  const { form, onSubmit } = useFormData({
    schema: uploadMediaSchema,
    handleSubmit: (data) => {
      mutation.mutate({
        file: data.file,
        name: data.name,
        alt: data.alt,
      });
    },
  });

  return {
    form,
    onSubmit,
  };
};

export default useCMSUploadMedia;
