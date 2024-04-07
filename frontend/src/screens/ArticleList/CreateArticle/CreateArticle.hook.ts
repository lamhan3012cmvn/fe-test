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

  const mutation = useReactMutation({
    mutationFn: async (body: any) => {
      let response = null;
      if (articleId) {
        response = await axiosCore.put(
          ENDPOINTS.ARTICLE + "/" + articleId,
          body
        );
      } else {
        response = await axiosCore.post(ENDPOINTS.ARTICLE, body);
      }
      if (response.error) {
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
      console.log("data: ", data);
      mutation.mutate({
        title: data.title,
        slug: data.slug,
        status: data.status,
        content: data.content,
        category: data.category,
        description: data.description,
        thumbnail: data.thumbnail,
        seo: {
          title: data.SEOTitle,
          description: data.SEODescription,
          canonical: data.SEOCanonical,
          keyword: data.SEOkeyword,
          schema: data.SEOSchema,
        },
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
