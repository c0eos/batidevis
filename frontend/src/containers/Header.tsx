import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../utils/reduxHooks";

export default function Header() {
  const user = useAppSelector((state) => state.user);

  const activeStyle = ({ isActive } : {isActive:boolean}) => {
    const basestyle = "px-2";
    if (isActive) {
      return `${basestyle} text-red-600`;
    }
    return basestyle;
  };

  return (
    <nav className="flex flex-row py-4 bg-slate-100">
      <Link to="/" className="px-2">Accueil</Link>

      <span className="grow" />

      <div className="flex flex-row justify-evenly grow">
        {user.isLoggedIn && <NavLink to="/clients" className={activeStyle}>Clients</NavLink>}
        {user.isLoggedIn && <NavLink to="/devis" className={activeStyle}>Devis</NavLink>}
        {user.isLoggedIn && <NavLink to="/factures" className={activeStyle}>Factures</NavLink>}
        {user.isLoggedIn && <NavLink to="/acomptes" className={activeStyle}>Acomptes</NavLink>}
      </div>

      <span className="grow" />

      {!user.isLoggedIn && <Link to="/login" className="px-2">Se Connecter</Link>}
      {user.isLoggedIn && <Link to="/settings" className="px-2">Paramètres</Link>}
      {user.isLoggedIn && <Link to="/logout" className="px-2">Se déconnecter</Link>}
    </nav>
  );
}
