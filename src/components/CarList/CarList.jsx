import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";
import {useSelector } from "react-redux";

import { selectFavourites }  from "../../redux/cars/selectors.js";

export default function CarList({ items }) {
  const favourites = useSelector(selectFavourites);
  return (
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
  );
}
