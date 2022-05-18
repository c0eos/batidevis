import { Link } from "react-router-dom";
import { useAppSelector } from "../utils/reduxHooks";

export default function Header(props: any) {
  const user = useAppSelector((state) => state.user);

  return (
    <nav className="flex flex-row py-4 bg-slate-100">
      <Link to="/" className="px-2">Accueil</Link>

      <span className="grow" />

      {user.isLoggedIn && <Link to="/clients" className="">Clients</Link>}
      {user.isLoggedIn && <Link to="/devis" className="pl-8">Devis</Link>}
      {user.isLoggedIn && <Link to="/factures" className="pl-8">Factures</Link>}
      {user.isLoggedIn && <Link to="/acomptes" className="pl-8">Acomptes</Link>}

      <span className="grow" />

      {!user.isLoggedIn && <Link to="/login" className="px-2">Se Connecter</Link>}
      {user.isLoggedIn && <Link to="/settings" className="px-2">Paramètres</Link>}
      {user.isLoggedIn && <Link to="/logout" className="px-2">Se déconnecter</Link>}
    </nav>
  );
}
