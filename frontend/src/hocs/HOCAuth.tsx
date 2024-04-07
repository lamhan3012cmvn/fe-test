import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { USER_ROLES } from "~/constants/common.constant";
import { ENDPOINTS } from "~/constants/endpoints.constant";
import { ROUTES } from "~/constants/routes.constant";
import { axiosCore } from "~/core";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "~/helpers/common.helper";
import { useReactQuery, useRouter } from "~/hooks";
import { useAppDispatch } from "~/hooks/useRedux";
import { AdminModel } from "~/models";
import { updateCurrentUser } from "~/store/auth/auth.action";

interface IProps {
  children: ReactNode;
  roles: USER_ROLES[];
}
export const HOCAuth = (props: IProps) => {
  const token = getFromLocalStorage("token");
  const acceptRoles = props.roles || [];
  const dispatch = useAppDispatch();
  const { location } = useRouter();

  const { data, isFetching } = useReactQuery<AdminModel>({
    queryKey: ["get-current-user", location.pathname],
    queryFn: async () => {
      const response = await axiosCore.get(ENDPOINTS.GET_CURRENT_USER);
      if (response?.error) {
        return null;
      }
      return response.data;
    },
  });

  useEffect(() => {
    dispatch(updateCurrentUser(data));
  }, [dispatch, data]);

  // const isNeedLogin =
  //   !token ||
  //   (!isFetching && !data) ||
  //   (!isFetching && data && !acceptRoles.includes(data?.role));
  const isNeedLogin = !token

  if (isNeedLogin) {
    setToLocalStorage("token", "");
    return <Navigate to={ROUTES.LOGIN} />;
  }
  
  return props.children;
};
