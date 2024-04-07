import SearchElement from "./SearchElement";
import SortElement from "./SortElement";
import TypeElement from "./TypeElement";

const CMSFilter = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-x-4 gap-y-5">
      <SearchElement />
      <SortElement />
      <TypeElement />
    </div>
  );
};

export default CMSFilter;
