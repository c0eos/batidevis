import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utils/reduxHooks";
import { logout } from "../../slices/userSlice";

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="container mx-auto max-w-sm mt-4 bg-slate-200">
      <h1 className="font-bold text-2xl text-center">Se déconnecter ?</h1>
      <button type="submit" onClick={handleSubmit} className="block mx-auto bg-slate-400 mt-4 px-4 py-1">Valider</button>

    </div>
  );
}
