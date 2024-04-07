import { Label } from "~/components/ui/label";
import UploadComponent from "./UploadComponent/UploadComponent.view";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { PageHeader } from "..";
import useCMSUploadMedia from "./CMSUploadMedia.hook";
import { Form, FormField, FormMessage } from "~/components/ui/form";
import { ICMSUploadMedia } from "./CMSUploadMedia.props";

const CMSUploadMedia = (props: ICMSUploadMedia) => {
  const { form, onSubmit } = useCMSUploadMedia({
    onUploadSuccess: props.onUploadSuccess,
  });

  return (
    <div className="w-full">
      <PageHeader title="Upload media" />
      <Form {...form}>
        <form className="w-full h-full">
          <div className="flex flex-col w-full gap-5">
            <div className="grid w-full items-center gap-1.5">
              <Label>File</Label>
              <div>
                <FormField
                  name="file"
                  control={form.control}
                  render={() => (
                    <>
                      <UploadComponent
                        accept="image"
                        onChangeFile={(file) => {
                          const fileName = (file as any).name?.split(".")[0];
                          form.setValue("file", file);
                          form.setValue("name", fileName);
                          form.clearErrors("file");
                        }}
                        onRemoveFile={() => {
                          form.setValue("file", undefined);
                          form.setValue("name", "");
                        }}
                      />
                      <FormMessage className="errorMessage" />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Name image</Label>
              <div className="w-full">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter name image"
                        {...field}
                      />
                      <FormMessage className="errorMessage" />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Alt property</Label>
              <div className="w-full">
                <FormField
                  name="alt"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter alt property"
                        {...field}
                      />
                      <FormMessage className="errorMessage" />
                    </>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <Button type="button" onClick={onSubmit}>
              Upload file
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CMSUploadMedia;
