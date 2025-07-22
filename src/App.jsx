import { Suspense} from 'react'
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import css from "./App.module.css";
import Navigation from "./components/Navigation/Navigation.jsx";
export default function App() {
  return (
    <>
      <div className={css.container}>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route />

            <Route />
          </Routes>
          </Suspense> 
      </div>
    </>
  );
}

