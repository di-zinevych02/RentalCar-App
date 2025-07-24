import { NavLink, useParams } from "react-router-dom";
import css from "./CarCard.module.css";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteFavouriteCar,
  addFavouriteCar,
} from "../../redux/cars/operations.js";

export default function CarCard({ carCard, favourites }) {
  const dispatch = useDispatch();
  const { carType } = useParams();
  const [isFavouriteState, setIsFavouriteState] = useState();

  const isFavourite = favourites?.some((fav) => fav === carCard.id);

  useEffect(() => {
    isFavourite && setIsFavouriteState(true);
  }, [isFavourite]);



  const handleAddFavourite = async () => {
    toast.success("Adding");
    try {
      if (carCard.id) {
        await dispatch(addFavouriteCar(CarCard.id))
          .unwrap()
          .then(() => {
            setIsFavouriteState(true);
          });
        toast.success("Added to favourites");
      }
    } catch(error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className={css.carCardWrapper}>
      <div className={css.imgWrapper}>
        <img className={css.img} src={carCard.img} alt="car" />
      </div>
      <div className={css.titleWrapper}>
              <h3 className={css.title}>{carCard.brand}</h3>
              <h3 className={css.title}>{carCard.modal},</h3>
              <h3 className={css.title}>{carCard.year}</h3>
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
        <NavLink
          className={css.learnMoreBtn}
          to={`/cars/${carCard.id}`}
        >
          Read more
        </NavLink>
          <div onClick={handleAddFavourite} className={css.svgWrapper}>
            <Svg styles={css.svg} name="activeheart" />
          </div>
      </div>
    </div>
  );
}
