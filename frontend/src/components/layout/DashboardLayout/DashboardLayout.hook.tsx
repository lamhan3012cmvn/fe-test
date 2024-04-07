import { Link } from "react-router-dom";
import { ROUTES } from "~/constants/routes.constant";
import { RiDashboard2Line, RiArticleLine } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { RxComponent1 } from "react-icons/rx";

const listMenu = [
  {
    label: <Link to={ROUTES.DASHBOARD}>Dashboard</Link>,
    key: "dashboard",
    icon: <RiDashboard2Line size={18} />,
  },
  {
    label: "Article",
    key: "article",
    icon: <RiArticleLine size={18} />,
    children: [
      {
        label: <Link to={ROUTES.ARTICLE_LIST}>Article list</Link>,
        key: "article-1",
        icon: <CiViewList size={18} />,
      },
      {
        label: <Link to={ROUTES.ARTICLE_CATEGORY}>Article category</Link>,
        key: "news-2",
        icon: <BiCategoryAlt size={18} />,
      },
    ],
  },
  {
    label: <Link to={ROUTES.COMPONENT_DEMO}>Component</Link>,
    key: "Component",
    icon: <RxComponent1 size={18} />,
  },
];
const useDashboardLayout = () => {
  return {
    listMenu,
  };
};

export default useDashboardLayout;
