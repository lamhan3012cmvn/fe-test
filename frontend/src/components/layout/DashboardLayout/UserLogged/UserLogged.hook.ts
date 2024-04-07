import { setToLocalStorage } from "~/helpers/common.helper";
import { useRouter } from "~/hooks";
import { useAppDispatch } from "~/hooks/useRedux";
import { updateCurrentUser } from "~/store/auth/auth.action";

const useUserLogged = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useRouter();
  const handleLogout = () => {
    setToLocalStorage("token", "");
    dispatch(updateCurrentUser(undefined));
    navigate("/login");
  };
  return {
    handleLogout,
  };
};

export default useUserLogged;
