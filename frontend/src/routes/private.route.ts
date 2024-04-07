import { DashboardLayout } from "~/components/layout";
import { USER_ROLES } from "~/constants/common.constant";
import { ROUTES } from "~/constants/routes.constant";
import {
  ArticleCategory,
  ArticleList,
  ComponentDemo,
  Dashboard,
} from "~/screens";

export const PRIVATE_ROUTES = [
  {
    path: "/",
    layout: DashboardLayout,
    element: Dashboard,
    roles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.COMPONENT_DEMO,
    layout: DashboardLayout,
    element: ComponentDemo,
    roles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.DASHBOARD,
    layout: DashboardLayout,
    element: Dashboard,
    roles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ARTICLE_LIST,
    layout: DashboardLayout,
    element: ArticleList,
    roles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ARTICLE_CATEGORY,
    layout: DashboardLayout,
    element: ArticleCategory,
    roles: [USER_ROLES.ADMIN],
  },
];
