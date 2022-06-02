import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../utils/reduxHooks";

export default function Header() {
  const user = useAppSelector((state) => state.user);

  const activeStyle = ({ isActive } : {isActive:boolean}) => {
    const basestyle = "px-4";
    if (isActive) {
      return `${basestyle} text-black font-bold`;
    }
    return `${basestyle} text-gray-500`;
  };

  return (
    <nav className="flex flex-row py-4 bg-slate-100">

      <div className="grow">
        {user.isLoggedIn && (
        <NavLink to="/clients" className={activeStyle}>
          <i className="pr-1 fa-solid fa-user-group" />
          Clients
        </NavLink>
        )}
        {user.isLoggedIn && (
        <NavLink to="/devis" className={activeStyle}>
          <i className="pr-1 fa-solid fa-file-invoice" />
          Devis
        </NavLink>
        )}
        {user.isLoggedIn && (
        <NavLink to="/factures" className={activeStyle}>
          <i className="pr-1 fa-solid fa-file-invoice-dollar" />
          Factures
        </NavLink>
        )}
        {user.isLoggedIn && (
        <NavLink to="/acomptes" className={activeStyle}>
          <i className="pr-1 fa-solid fa-coins" />
          Acomptes
        </NavLink>
        )}
      </div>

      <span className="grow" />

      {!user.isLoggedIn && <Link to="/login" className="px-2">Se Connecter</Link>}
      {user.isLoggedIn && (
      <NavLink to="/settings" className={activeStyle}>

        <i className="pr-1 fa-solid fa-gear" />
        Paramètres
      </NavLink>
      )}
      {user.isLoggedIn && (
      <NavLink to="/logout" className={activeStyle}>
        <i className="pr-1 fa-solid fa-right-from-bracket" />
        Se déconnecter
      </NavLink>
      )}
    </nav>
  );
}
