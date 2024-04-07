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

const SortElement = () => {
  const classWrapper = cn("max-w-[400px] w-full");
  return (
    <div className={classWrapper}>
      <div className="grid w-full items-center gap-1.5 z-20">
        <Label htmlFor="search">Sort</Label>
        <Select>
          <SelectTrigger className="w-full relative">
            <SelectValue placeholder="Select sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="-1">Latest</SelectItem>
              <SelectItem value="1">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortElement;
