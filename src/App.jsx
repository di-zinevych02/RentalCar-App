import { Suspense, lazy} from 'react'
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import css from "./App.module.css";
import Navigation from "./components/Navigation/Navigation.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";


const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
export default function App() {
  return (
    <>
      <div className={css.container}>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route />
          </Routes>
          </Suspense> 
      </div>
    </>
  );
}

