import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
      <header className={css.header}>
          <nav className={css.nav}>
               <a className={css.logo} href="/">
                <span className={css.textLogo}>Rental</span>Car</a>
        <ul className={css.menu}>
          <li>
            <NavLink to="/" className={getLinkStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={getLinkStyles}>
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}