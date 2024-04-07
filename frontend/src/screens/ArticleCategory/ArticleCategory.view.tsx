import {
  CMSDrawer,
  CMSFilter,
  CMSTable,
  PageHeader,
} from "~/components/common";
import { Button } from "~/components/ui/button";
import CreateArticleCategory from "./CreateArticleCategory/CreateArticleCategory.view";
import { articleCategoryListColumns } from "./ArticleCategory.config";
import useArticleCategory from "./ArticleCategory.hook";

const ArticleCategory = () => {
  const {
    rowTarget,
    data,
    isOpenCreate,
    handleToggleCreate,
    handleDeleteRow,
    handleEditRow,
  } = useArticleCategory();

  return (
    <div className="w-full">
      <PageHeader title="Category article">
        <div className="w-full flex justify-end">
          <Button onClick={handleToggleCreate}>Create new</Button>
        </div>
      </PageHeader>
      <div className="mb-5">
        <CMSFilter />
      </div>
      <CMSTable
        onEdit={handleEditRow}
        onDelete={handleDeleteRow}
        dataTableColumns={articleCategoryListColumns}
        dataSource={data || []}
      />
      <CMSDrawer
        visible={isOpenCreate}
        onClose={handleToggleCreate}
        width={800}
        title="Create category article"
      >
        <CreateArticleCategory
          IdRowTarget={rowTarget}
          onCloseModal={handleToggleCreate}
        />
      </CMSDrawer>
    </div>
  );
};

export default ArticleCategory;
