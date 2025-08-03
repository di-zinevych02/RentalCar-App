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
    <ul className={css.list}>
            {loading && <Loader/>}
        {error && <ErrorMessage error={error} />}
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
  );
}
