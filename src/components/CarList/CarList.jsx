import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";
import {useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { selectFavourites }  from "../../redux/cars/selectors.js";
import { selectFiltersLoading, selectFiltersError } from "../../redux/filters/selectors.js";
export default function CarList({ items }) {
  const favourites = useSelector(selectFavourites);
    const error = useSelector(selectFiltersError);
    const loading = useSelector(selectFiltersLoading);
  return (
  <>
      {loading && <Loader />}
        {error && <ErrorMessage error={error} />}
    <ul className={css.list}>  
      {items &&
        items.map((carCard) => (
          <li className={css.item} key={carCard.id}>
            <CarCard
              carCard={carCard}
              favourites={favourites}
            />
          </li>
        ))}
      </ul>
      </>
  );
}
