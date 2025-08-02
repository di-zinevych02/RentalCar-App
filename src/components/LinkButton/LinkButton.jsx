import { NavLink } from "react-router-dom";
import css from "./LinkButton.module.css";

export default function LinkButton({ to, children }) {
    return (
        <NavLink to={to} className={css.linkBtn}>{children}</NavLink>
    );
}