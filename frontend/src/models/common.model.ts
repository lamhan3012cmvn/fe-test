import { MediaModel } from "./media.model";

export type SeoModel = {
  title?: string;
  description?: string;
  canonical?: string;
  keyword?: string;
  schema?: string;
  thumbnail?: MediaModel;
};
