import { ELEMENT_STATUS } from "~/constants/common.constant";
import { SeoModel } from "./common.model";

export type CategoryModel = {
  title: string;

  slug: string;

  description?: string;

  parentCategory?: string | CategoryModel;

  childCategory?: string[] | CategoryModel[];

  seo?: SeoModel;

  status: ELEMENT_STATUS;
};
