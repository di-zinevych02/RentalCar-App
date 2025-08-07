
import { useEffect } from "react";
import Container from "../../components/Container/Container.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCurrentCarLoading,
    selectCurrentCar,
  selectCarsError
} from "../../redux/cars/selectors.js";
import { fetchById } from "../../redux/cars/operations.js";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import Loader from "../../components/Loader/Loader.jsx";
import CarDetails from "../../components/CarDetails/CarDetails.jsx";
import css from "./CarViewPage.module.css";

export default function CarViewPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
      const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectCurrentCarLoading);
  const error = useSelector(selectCarsError);

  useEffect(() => {
    if (id) dispatch(fetchById(id));
  }, [dispatch, id]);
  return (
    <Container>
    <section className={css.section}>
    
      {isLoading ? (
        <Loader />
      ) : error || !car ? (
        <NotFoundPage />
        ) : (
            <>
                <CarDetails car={car} />
                
                </>
      )}
      
      </section>
      </Container>
  );
}

