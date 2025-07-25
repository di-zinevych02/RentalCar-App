import { NavLink } from "react-router-dom";
import css from "./CarCard.module.css";
import { toast } from "react-hot-toast";
import Svg from "../Svg/Svg.jsx";
import { useDispatch} from "react-redux";
import { addToFavorites, removeFromFavorites } from '../../redux/favourites/slice.js';


export default function CarCard({ carCard, favourites }) {
  const dispatch = useDispatch();
    const isFavourite = favourites.includes(carCard.id);
    
const toggleFavorite = () => {
  if (isFavourite) {
    dispatch(removeFromFavorites(carCard.id));
  } else {
    dispatch(addToFavorites(carCard.id));
  }
};
    
const handleToggleFavourite = () => {
  toggleFavorite();
  toast.success(isFavourite ? "Removed from favourites" : "Added to favourites");
};

  return (
    <div className={css.carCardWrapper}>
      <div className={css.imgWrapper}>
        <img className={css.img} src={carCard.img} alt="car" />
      </div>

      <div onClick={handleToggleFavourite} className={css.svgWrapper}>
        <Svg
          styles={css.svg}
          name={isFavourite ? "activeheart" : "heart"}
        />
      </div>

      <div className={css.titleWrapper}>
        <h3 className={css.title}>{carCard.brand} {carCard.model}, {carCard.year}</h3>
        <div className={css.costWrapper}>
          <h3 className={css.price}>{carCard.rentalPrice}</h3>
        </div>
      </div>

      <div className={css.textWrapper}>
        <p className={css.text}>{carCard.address}</p>
        <p className={css.text}>{carCard.rentalCompany}</p>
        <p className={css.text}>{carCard.type}</p>
        <p className={css.text}>{carCard.mileage}</p>
      </div>

      <div className={css.btnWrapper}>
        <NavLink className={css.learnMoreBtn} to={`/cars/${carCard.id}`}>
          Read more
        </NavLink>
      </div>
    </div>
  );
}
