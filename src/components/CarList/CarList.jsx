import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";

export default function CarList({ items, favourites }) {
  return (
    <ul className={css.list}>
      {items &&
        items.map((carCard) => (
          <li className={css.item} key={carCard.id}>
            <CarCard
              favourites={favourites}
              carCard={carCard}
            />
          </li>
        ))}
    </ul>
  );
}
