import {
  CMSDrawer,
  CMSFilter,
  CMSTable,
  PageHeader,
} from "~/components/common";
import { articleListColumns } from "./ArticleList.config";
import useArticleList from "./ArticleList.hook";
import CreateArticle from "./CreateArticle/CreateArticle.view";
import { Button } from "~/components/ui/button";

const ArticleList = () => {
  const {
    rowTarget,
    data,
    isOpenCreate,
    handleToggleCreate,
    handleDeleteRow,
    handleEditRow,
  } = useArticleList();

  return (
    <div className="w-full">
      <PageHeader title="List article">
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
        dataTableColumns={articleListColumns}
        dataSource={data || []}
      />
      <CMSDrawer
        visible={isOpenCreate}
        onClose={handleToggleCreate}
        width={800}
        expandDefault={true}
        title="Create a new article"
      >
        <CreateArticle
          IdRowTarget={rowTarget}
          onCloseModal={handleToggleCreate}
        />
      </CMSDrawer>
    </div>
  );
};

export default ArticleList;
