export interface ICMSSelectSearch {
  data: Array<{ label: string; value: any }>;
  placeholder?: string;
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: any;
}
