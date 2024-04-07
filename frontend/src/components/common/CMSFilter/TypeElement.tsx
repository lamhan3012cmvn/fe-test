import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/helpers/common.helper";

const TypeElement = () => {
  const classWrapper = cn("max-w-[400px] w-full");
  return (
    <div className={classWrapper}>
      <div className="grid w-full items-center gap-1.5 z-20">
        <Label htmlFor="search">Type</Label>
        <Select>
          <SelectTrigger className="w-full relative">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Picture</SelectItem>
              <SelectItem value="2">PDF</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypeElement;
