import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";
import { checkToken } from "../api/user";
import { login } from "../slices/userSlice";

// HOC de controle des data et de la sécurité
export default function RequireDataAuth(props: any) {
  const params = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const { child: Child, auth } = props;

  // gestion des state
  const [redirect, setRedirect] = useState<Boolean|null>(null);
  const [path, setPath] = useState("/login");

  useEffect(() => {
    setRedirect(false);

    if (!user.isLoggedIn) {
      console.log("not logged in");

      const token = window.localStorage.getItem("token");
      console.log(token, auth, !token && auth);

      if (!token && auth) {
        console.log("no token and need auth");
        setRedirect(true);
      } else {
        checkToken(token)
          .then((userdata) => dispatch(login(userdata)))
          .catch((error) => {
            console.log(error);
            if (auth) {
              setRedirect(true);
            }
          });
      }
    }
  }, [Child, auth]);

  if (redirect === null) {
    return (<div />);
  }

  if (redirect) {
    return <Navigate to={path} />;
  }

  return (<Child {...props} params={params} />);
}
