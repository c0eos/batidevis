import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api/user";

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(email, password);

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
    <div className="container mx-auto max-w-sm bg-slate-100">
      <h1 className="font-bold text-2xl text-center py-4">Se Connecter</h1>
      <form onSubmit={handleSubmit} className="mx-auto px-4 pb-4">
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
