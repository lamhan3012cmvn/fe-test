import { CMSCKEditor, CMSSelectSearch } from "~/components/common";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import ThumbnailArticle from "./ThumbailArticle";
import useCreateArticle from "./CreateArticle.hook";
import { Form, FormField, FormMessage } from "~/components/ui/form";
import { buildSelectSearchData } from "~/helpers/common.helper";
import { ELEMENT_STATUS_LIST } from "~/constants/common.constant";
import { ICreateArticle } from "./CreateArticle.props";

const CreateArticle = (props: ICreateArticle) => {
  const { form, onSubmit, categories } = useCreateArticle({
    IdRowTarget: props.IdRowTarget,
    onCloseModal: props.onCloseModal,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="w-full min-h-full relative flex flex-col justify-between "
      >
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
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
              <Label htmlFor="title">Slug</Label>
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
              <Label htmlFor="category">Category</Label>
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full">
                    <CMSSelectSearch
                      placeholder="Select category"
                      value={field.value}
                      data={buildSelectSearchData(categories, {
                        labelField: "title",
                        valueField: "_id",
                        isHaveResetOption: true,
                      })}
                      onChange={(value) => {
                        form.setValue("category", value);
                        form.clearErrors("category");
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
              <Label htmlFor="description">Thumbnail</Label>
              <FormField
                name="thumbnail"
                control={form.control}
                render={() => (
                  <div className="w-full">
                    <ThumbnailArticle
                      onChange={(imageId) => {
                        form.setValue("thumbnail", imageId);
                        form.clearErrors("thumbnail");
                      }}
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
          <div className="w-full">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Content</Label>
              <FormField
                name="content"
                control={form.control}
                render={() => (
                  <div className="w-full">
                    <CMSCKEditor
                      onChange={(value) => {
                        form.setValue("content", value);
                        form.clearErrors("content");
                      }}
                    />
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
          <Button variant={"outline"} className="w-full">
            Cancel
          </Button>
          <Button className="w-full">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateArticle;
