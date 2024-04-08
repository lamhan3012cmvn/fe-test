import { DashboardLayout } from '~/components/layout';
import { USER_ROLES } from '~/constants/common.constant';
import { ROUTES } from '~/constants/routes.constant';
import { ArticleCategory, ArticleList, LinkedInAuthenticated } from '~/screens';

export const PRIVATE_ROUTES = [
	{
		path: '/',
		layout: DashboardLayout,
		element: ArticleList,
		roles: [USER_ROLES.ADMIN]
	},
	{
		path: ROUTES.ARTICLE_CATEGORY,
		layout: DashboardLayout,
		element: ArticleCategory,
		roles: [USER_ROLES.ADMIN]
	},
	{
		path: ROUTES.LINKED_IN_AUTHENTICATED,
		layout: DashboardLayout,
		element: LinkedInAuthenticated
	}
];
