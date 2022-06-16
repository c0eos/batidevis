import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    getToken(email, password)
      .then((token: string) => {
        window.localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="container max-w-sm mx-auto bg-slate-100">
      <h1 className="py-4 text-2xl font-bold text-center">Se Connecter</h1>
      <form onSubmit={handleSubmit} className="px-4 pb-4 mx-auto">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-2 py-1"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          // minLength={8}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-2 py-1 mt-2"
        />
        <button type="submit" className="block w-full py-1 mt-4 bg-slate-300">Se connecter</button>
      </form>
    </div>
  );
}
