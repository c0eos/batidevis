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
    <div className="container max-w-sm py-4 mx-auto bg-white rounded shadow my-4">
      <h1 className="text-xl font-bold text-center">Se déconnecter ?</h1>
      <button type="submit" onClick={handleSubmit} className="block px-4 py-1 mx-auto mt-4 bg-stone-300 hover:bg-stone-400 rounded">Valider</button>
    </div>
  );
}
