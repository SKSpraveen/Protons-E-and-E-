// hooks/useLogout.js
import { useDispatch } from "react-redux";
import { signoutSuccess  } from "../redux/user/userSlice.js";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(signoutSuccess ());
  };

  return { logout };
};
