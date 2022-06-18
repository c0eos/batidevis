import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../utils/reduxHooks";
import logo from "../assets/Logo.webp";

export default function Header() {
  const user = useAppSelector((state) => state.user);

  const activeStyle = ({ isActive } : {isActive:boolean}) => {
    const basestyle = "px-4 py-4";
    if (isActive) {
      return `${basestyle} font-bold`;
    }
    return `${basestyle} text-stone-500`;
  };

  return (
    <nav className="flex flex-row bg-white border-b-4 border-amber-700">
      <img src={logo} className="pl-2 pr-4 my-auto max-h-12" />

      <div className="py-4 grow">
        {user.isLoggedIn && (
          <NavLink to="/clients" className={activeStyle}>
            <i className="pr-1 fa-solid fa-user-group" />
            <span className="hidden md:inline">
              Clients
            </span>
          </NavLink>
        )}
        {user.isLoggedIn && (
          <NavLink to="/devis" className={activeStyle}>
            <i className="pr-1 fa-solid fa-file-invoice" />
            <span className="hidden md:inline">
              Devis
            </span>
          </NavLink>
        )}
        {user.isLoggedIn && (
          <NavLink to="/factures" className={activeStyle}>
            <i className="pr-1 fa-solid fa-file-invoice-dollar" />
            <span className="hidden md:inline">
              Factures
            </span>
          </NavLink>
        )}
        {/* {user.isLoggedIn && (
        <NavLink to="/acomptes" className={activeStyle}>
          <i className="pr-1 fa-solid fa-coins" />
          <span className="hidden md:inline">
            Acomptes
          </span>
        </NavLink>
        )} */}
      </div>

      <span className="grow" />

      {!user.isLoggedIn && <Link to="/login" className="px-2 py-4">Se Connecter</Link>}
      {user.isLoggedIn && (
        <NavLink to="/settings" className={activeStyle}>

          <i className="pr-1 fa-solid fa-gear" />
          <span className="hidden md:inline">
            Paramètres
          </span>
        </NavLink>
      )}
      {user.isLoggedIn && (
        <NavLink to="/logout" className={activeStyle}>
          <i className="pr-1 fa-solid fa-right-from-bracket" />
          <span className="hidden md:inline">
            Se déconnecter
          </span>
        </NavLink>
      )}
    </nav>

  );
}
