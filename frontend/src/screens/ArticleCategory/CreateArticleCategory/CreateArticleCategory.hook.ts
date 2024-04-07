import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useEffect } from "react";
import { ELEMENT_STATUS } from "~/constants/common.constant";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { generateSlugByText } from "~/helpers/common.helper";
import { categorySchema } from "~/helpers/schemaValidation.helper";
import { useFormData, useReactMutation, useReactQuery } from "~/hooks";
import { IUseCreateArticleCategory } from "./CreateArticleCategory.props";
import { CategoryModel } from "~/models";

const useCreateArticleCategory = (props: IUseCreateArticleCategory) => {
  const categoryId = props.IdRowTarget || "";

  const queryClient = useQueryClient();

  const mutation = useReactMutation({
    mutationFn: async (body: any) => {
      let response = null;
      if (categoryId) {
        response = await axiosCore.put(
          ENDPOINTS.CATEGORY + "/" + categoryId,
          body
        );
      } else {
        response = await axiosCore.post(ENDPOINTS.CATEGORY, body);
      }
      if (response.error) {
        message.error({
          className: "messagePosition",
          content:
            response.message ||
            `Can not ${categoryId ? "update" : "create"} the category`,
        });

        return false;
      }

      message.success({
        className: "messagePosition",
        content: `${categoryId ? "Update" : "Create"} category success`,
      });

      queryClient.invalidateQueries({
        queryKey: ["get-list-category"],
      });

      if (props.onCloseModal) props.onCloseModal();
      return true;
    },
  });

  const { form, onSubmit } = useFormData({
    schema: categorySchema,
    defaultValues: {
      parentCategory: "",
      status: ELEMENT_STATUS.ACTIVE,
    },
    handleSubmit: (data) => {
      mutation.mutate({
        title: data.title,
        slug: data.slug,
        status: data.status,
        parentCategory: data.parentCategory,
        description: data.description,
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

  const { data: parentCategory = [] } = useReactQuery({
    queryKey: ["get-parent-category"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.CATEGORY_PARENT);

      if (!response?.error) {
        return response?.data || [];
      }

      return [];
    },
  });

  const { isLoading, data: categoryDetails } = useReactQuery<CategoryModel>({
    queryKey: ["get-category", categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const response = await axiosCore.get(
        ENDPOINTS.CATEGORY + "/" + categoryId
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
    form.setValue("title", categoryDetails?.title ?? "");
    form.setValue("slug", categoryDetails?.slug ?? "");
    form.setValue("description", categoryDetails?.description ?? "");
    form.setValue("parentCategory", categoryDetails?.parentCategory ?? null);
    form.setValue("status", categoryDetails?.status ?? ELEMENT_STATUS.ACTIVE);
    form.setValue("SEOTitle", categoryDetails?.seo?.title ?? "");
    form.setValue("SEODescription", categoryDetails?.seo?.description ?? "");
    form.setValue("SEOCanonical", categoryDetails?.seo?.canonical ?? "");
    form.setValue("SEOkeyword", categoryDetails?.seo?.keyword ?? "");
    form.setValue("SEOSchema", categoryDetails?.seo?.schema ?? "");
  }, [categoryDetails, form]);

  return {
    form,
    onSubmit,
    parentCategory,
  };
};

export default useCreateArticleCategory;
