import { Select } from "antd";
import { ICMSSelectSearch } from "./CMSSelectSearch.props";

const CMSSelectSearch = (props: ICMSSelectSearch) => {
  const onChange = (value: string) => {
    if (props.onChange) props.onChange(value);
  };

  const onSearch = (value: string) => {
    // console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      className="h-[40px] w-full"
      showSearch
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={props.data}
    />
  );
};
export default CMSSelectSearch;
