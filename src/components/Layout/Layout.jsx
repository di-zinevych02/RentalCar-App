import Navigation from "../Navigation/Navigation.jsx";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className={css.container}>
      <Navigation/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
