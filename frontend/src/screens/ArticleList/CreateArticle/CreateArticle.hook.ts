import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect } from "react";
import { ELEMENT_STATUS } from "~/constants/common.constant";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { generateSlugByText } from "~/helpers/common.helper";
import { articleSchema } from "~/helpers/schemaValidation.helper";
import { useFormData, useReactMutation, useReactQuery } from "~/hooks";
import { ICreateArticle } from "./CreateArticle.props";
import { CategoryModel } from "~/models";

const useCreateArticle = (props: ICreateArticle) => {
  const articleId = props.IdRowTarget || "";

  const queryClient = useQueryClient();

  const linkedInMutation = useReactMutation({
    mutationFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.CHECK_AUTH_LINKEDIN);
      console.log("response: ", response)

      const { error, data, isAuthenticated, url } = response?.data || {}
      if (!data || error || !isAuthenticated) {
        message.error({
          className: "messagePosition",
          content: response.message || "An error occurred while checking linkedIn",
        });

        if(!isAuthenticated && url) {
          window.open(url, '_blank');
        }

        return false;
      }

      return true;
    },
  })

  const mutation = useReactMutation({
    mutationFn: async (body: any) => {

      const linkedInResponse = await linkedInMutation.mutateAsync({});
      console.log("linkedInResponse: ", linkedInResponse)

      return;
      // if (!linkedInResponse) return false;

      let response = null;
      if (articleId) {
        response = await axiosCore.put(
          ENDPOINTS.ARTICLE + "/" + articleId,
          body, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axiosCore.post(ENDPOINTS.ARTICLE, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (!response.data || response.error) {
        message.error({
          className: "messagePosition",
          content:
            response.message ||
            `Can not ${articleId ? "update" : "create"} the category`,
        });

        return false;
      }

      message.success({
        className: "messagePosition",
        content: `${articleId ? "Update" : "Create"} category success`,
      });

      queryClient.invalidateQueries({
        queryKey: ["get-list-category"],
      });

      if (props.onCloseModal) props.onCloseModal();
      return true;
    },
  });



  const { form, onSubmit } = useFormData({
    schema: articleSchema,
    defaultValues: {
      status: ELEMENT_STATUS.ACTIVE,
    },
    handleSubmit: (data) => {
      mutation.mutate({
        title: data.title,
        content: data.content,
        files: data.files,
      });
    },
  });

  const { data: categories = [] } = useReactQuery({
    queryKey: ["get-parent-category"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.CATEGORY);

      if (!response?.error) {
        return response?.data || [];
      }

      return [];
    },
  });

  const { isLoading, data: articleDetails } = useReactQuery<CategoryModel>({
    queryKey: ["get-category", articleId],
    queryFn: async () => {
      if (!articleId) return null;
      const response = await axiosCore.get(
        ENDPOINTS.CATEGORY + "/" + articleId
      );
      console.log("response: ", response);

      if (response?.error) return null;

      return response?.data;
    },
  });

  const titleWatch = form.watch("title");

  useEffect(() => {
    const slugGenerate = generateSlugByText(titleWatch);
    form.setValue("slug", slugGenerate);
    form.clearErrors("slug");
  }, [form, titleWatch]);

  useEffect(() => {
    // form.setValue("title", articleDetails?.title ?? "");
    // form.setValue("slug", articleDetails?.slug ?? "");
    // form.setValue("description", articleDetails?.description ?? "");
    // form.setValue("parentCategory", articleDetails?.parentCategory ?? null);
    // form.setValue("status", articleDetails?.status ?? ELEMENT_STATUS.ACTIVE);
    // form.setValue("SEOTitle", articleDetails?.seo?.title ?? "");
    // form.setValue("SEODescription", articleDetails?.seo?.description ?? "");
    // form.setValue("SEOCanonical", articleDetails?.seo?.canonical ?? "");
    // form.setValue("SEOkeyword", articleDetails?.seo?.keyword ?? "");
    // form.setValue("SEOSchema", articleDetails?.seo?.schema ?? "");
  }, [articleDetails, form]);

  return {
    form,
    onSubmit,
    categories,
  };
};

export default useCreateArticle;
