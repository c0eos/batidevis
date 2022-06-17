import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";
import { UserForm } from "../../components";
import { IUser } from "../../utils/schemas";

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (userdata: IUser) => {
    getToken(userdata)
      .then((token: string) => {
        window.localStorage.setItem("token", token);
        navigate("/devis/");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="container max-w-sm px-4 mx-auto bg-slate-100">
      <UserForm onSubmit={onSubmit} title="Se connecter" />
    </div>
  );
}
