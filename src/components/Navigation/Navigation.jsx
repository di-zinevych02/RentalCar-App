import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import Container from "../Container/Container.jsx";
import Logo from "../Logo/Logo.jsx";
const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
      <header className={css.header}>
          <Container>
              <nav className={css.nav}>
                  <Logo />
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
              </Container>
    </header>
  );
}