import { MEDIA_TYPE } from "~/constants/common.constant";

export type MediaModel = {
  _id?: string;
  src: string;
  name: string;
  alt: string;
  type: MEDIA_TYPE;
};
