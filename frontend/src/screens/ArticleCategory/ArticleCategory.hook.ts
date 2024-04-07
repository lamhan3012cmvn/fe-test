import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback, useState } from "react";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { axiosCore } from "~/core";
import { useReactMutation, useReactQuery } from "~/hooks";

const useArticleCategory = () => {
  const queryClient = useQueryClient();
  const [rowTarget, setRowTarget] = useState("");
  const [isOpenCreate, setOpenCreate] = useState(false);

  const { isLoading, data } = useReactQuery({
    queryKey: ["get-list-category"],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.CATEGORY);
      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response.message || "Can not get list category",
        });

        return [];
      }
      return response.data;
    },
  });

  const mutation = useReactMutation({
    mutationFn: async (categoryId) => {
      const response = await axiosCore.delete(
        ENDPOINTS.CATEGORY + "/" + categoryId
      );

      if (response?.error) {
        message.error({
          className: "messagePosition",
          content: response.message || "Error delete category",
        });

        return;
      }

      message.success({
        className: "messagePosition",
        content: "Delete success",
      });
      queryClient.invalidateQueries({ queryKey: ["get-list-category"] });
    },
  });

  const handleToggleCreate = useCallback(() => {
    const isOpen = !isOpenCreate;
    if (!isOpen) {
      setRowTarget("");
    }
    setOpenCreate(!isOpenCreate);
  }, [isOpenCreate]);

  const handleEditRow = (data: any) => {
    setRowTarget(data._id);
    handleToggleCreate();
  };

  const handleDeleteRow = (data: any) => {
    mutation.mutate(data._id);
  };

  return {
    rowTarget,
    isOpenCreate,
    isLoading,
    data,
    handleToggleCreate,
    handleEditRow,
    handleDeleteRow,
  };
};

export default useArticleCategory;
