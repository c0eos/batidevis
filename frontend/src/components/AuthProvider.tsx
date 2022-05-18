import { Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";
import { checkToken } from "../api/user";
import { login } from "../slices/userSlice";

function RequireAuth({ children }: {children: JSX.Element}) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user.isLoggedIn) {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return (<Navigate to="/login" />);
    }
    checkToken(token)
      .then((userdata) => dispatch(login({ info: userdata, token })))
      .catch((error) => console.log(error));
  }

  return children;
}

export default RequireAuth;
