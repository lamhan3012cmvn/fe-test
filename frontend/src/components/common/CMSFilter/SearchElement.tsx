import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/helpers/common.helper";
import { IoIosSearch } from "react-icons/io";

const SearchElement = () => {
  const classWrapper = cn("w-full max-w-[400px]");

  return (
    <div className={classWrapper}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="search">Search</Label>
        <div className="relative w-full">
          <IoIosSearch
            size={18}
            className="absolute top-2/4 -translate-y-2/4 left-[10px] text-gray"
          />
          <Input
            className="pl-[40px]"
            type="text"
            id="search"
            placeholder="Enter search..."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchElement;
