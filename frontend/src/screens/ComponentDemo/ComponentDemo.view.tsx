import { Button } from "~/components/ui/button";
import WidgetSection from "./widgetSection";
import { MdOutlineEmail } from "react-icons/md";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { CMSSelectSearch } from "~/components/common";
import { Textarea } from "~/components/ui/textarea";

const ComponentDemo = () => {
  return (
    <div className="container p-5">
      <div className="w-full flex flex-col gap-10">
        <WidgetSection title="Button">
          <Button size={"sm"}>Button primary</Button>
        </WidgetSection>

        <WidgetSection title="Form input">
          <div className="relative w-full">
            <MdOutlineEmail
              size={18}
              className="absolute top-2/4 -translate-y-2/4 left-[10px] text-gray"
            />
            <Input className="pl-[40px]" type="email" placeholder="Email" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>

          <Select>
            <SelectTrigger className="w-full relative">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <CMSSelectSearch
            placeholder="Select search"
            data={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </WidgetSection>
      </div>
    </div>
  );
};

export default ComponentDemo;
