import css from "./CatalogPage.module.css";
import Container from "../../components/Container/Container.jsx";
import CarList from "../../components/CarList/CarList.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllCars }  from "../../redux/cars/selectors.js";
import { fetchCars } from "../../redux/cars/operations.js";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const allCars = useSelector(selectAllCars);
     useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);
    return (
        <div className={css.catalogwrapper}>
            <Container>
                <CarList items={allCars} />
            </Container>
        </div>
    );
};
