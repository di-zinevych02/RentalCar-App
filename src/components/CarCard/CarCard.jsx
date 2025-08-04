import css from "./CarCard.module.css";
import { toast } from "react-hot-toast";
import Svg from "../Svg/Svg.jsx";
import { useDispatch} from "react-redux";
import { addToFavorites, removeFromFavorites } from '../../redux/favourites/slice.js';
import LinkButton from "../LinkButton/LinkButton.jsx";

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
    <>
      <div className={css.imgWrapper}>
        <img className={css.img} src={carCard.img} alt="car" />
        <Svg
          onClick={handleToggleFavourite}
          styles={css.icon}
          name={isFavourite ? "activeheart" : "heart"}
        />
        </div>
      <div className={css.titleWrapper}>
        <h3 className={css.title}>{carCard.brand} <span className={css.modelTitle}>{carCard.model}</span>, {carCard.year}</h3>
        <h3 className={css.price}>${carCard.rentalPrice}</h3>
      </div>
      <div className={css.decription1}>
        <div className={css.textWrapper1}>
          <p className={css.text}>{carCard.address?.split(", ")[1]}</p>
        </div>
        <div className={css.textWrapper1}>
          <p className={css.text}>{carCard.address?.split(", ")[2]}</p>
        </div>
        <div className={css.textWrapper1}>
          <p className={css.text}>{carCard.rentalCompany}</p>
        </div>
        </div>
      <div className={css.decription2}>
        <div className={css.textWrapper}>
          <p className={css.text}>{carCard.type}</p>
          </div>
        <div className={css.textWrapper}>
        <p className={css.text}>{carCard.mileage?.toLocaleString("en").replace(/,/g, " ")} km</p>
        </div>
        </div>
      <div className={css.btnWrapper}>
        <LinkButton to={`/catalog/${carCard.id}`}>
          Read more
        </LinkButton>
      </div>
    </>
  );
}
