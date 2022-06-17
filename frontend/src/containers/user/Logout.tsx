import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { useAppDispatch } from "../../utils/reduxHooks";
import { logout } from "../../slices/userSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="container max-w-sm py-4 mx-auto bg-slate-100">
      <h1 className="text-2xl font-bold text-center">Se déconnecter ?</h1>
      <button type="submit" onClick={handleSubmit} className="block px-4 py-1 mx-auto mt-4 bg-slate-400">Valider</button>
    </div>
  );
}
