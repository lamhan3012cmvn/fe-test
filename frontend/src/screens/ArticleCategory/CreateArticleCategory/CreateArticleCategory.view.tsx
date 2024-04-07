import { CMSSelectSearch } from "~/components/common";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import useCreateArticleCategory from "./CreateArticleCategory.hook";
import { Form, FormField, FormMessage } from "~/components/ui/form";
import { ELEMENT_STATUS_LIST } from "~/constants/common.constant";
import { ICreateArticleCategory } from "./CreateArticleCategory.props";
import { buildSelectSearchData } from "~/helpers/common.helper";

const CreateArticleCategory = (props: ICreateArticleCategory) => {
  const { form, onSubmit, parentCategory } = useCreateArticleCategory({
    onCloseModal: props.onCloseModal,
    IdRowTarget: props.IdRowTarget,
  });

  return (
    <Form {...form}>
      <form
        className="w-full min-h-full relative flex flex-col justify-between "
        onSubmit={onSubmit}
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>Title</Label>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="Enter title" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Slug</Label>
              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="Enter slug" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Parent Category</Label>
              <FormField
                name="parentCategory"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <CMSSelectSearch
                      placeholder="Select category"
                      value={field.value}
                      data={buildSelectSearchData(parentCategory, {
                        labelField: "title",
                        valueField: "_id",
                        isHaveResetOption: true,
                        excludeValue: props.IdRowTarget,
                      })}
                      onChange={(value) => {
                        form.setValue("parentCategory", value);
                        form.clearErrors("parentCategory");
                      }}
                    />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="Select status">Status</Label>
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <CMSSelectSearch
                      value={field.value}
                      placeholder="status"
                      onChange={(value) => {
                        form.setValue("status", value);
                        form.clearErrors("status");
                      }}
                      data={ELEMENT_STATUS_LIST}
                    />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Description</Label>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Textarea placeholder="Enter description" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>SEO Title</Label>
              <FormField
                name="SEOTitle"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="SEO title" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>SEO Canonical</Label>
              <FormField
                name="SEOCanonical"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="SEO canonical" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>SEO Description</Label>
            <FormField
              name="SEODescription"
              control={form.control}
              render={({ field }) => (
                <div className="w-full">
                  <Textarea placeholder="Enter SEO description" {...field} />
                  <FormMessage className="errorMessage" />
                </div>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>SEO Keywords</Label>
              <FormField
                name="SEOkeyword"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input type="text" placeholder="SEO keywords" {...field} />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>SEO Schema</Label>
              <FormField
                name="SEOSchema"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <Input
                      type="text"
                      id="title"
                      placeholder="SEO schema"
                      {...field}
                    />
                    <FormMessage className="errorMessage" />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 actionBottomDrawer">
          <Button
            variant={"outline"}
            className="w-full"
            onClick={props.onCloseModal}
          >
            Cancel
          </Button>
          <Button className="w-full" isLoading={false}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateArticleCategory;
