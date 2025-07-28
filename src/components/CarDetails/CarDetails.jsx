import css from "./CarDetails.module.css";

import Container from "../Container/Container.jsx";
import Svg from "../Svg/Svg.jsx"
export default function CarDetails({car}) {
    const {
    brand,
    model,
    yea,
    id,
    address,
    mileage,
    rentalPrice,
    description,
        img,
        // rentalConditions,
        // type,
        // engineSize,
        // fuelConsumption,
        // accessories
    
    } = car;
    return (
        <section className={css.section}>
            <Container >
                <div className={css.carContainer}>
                    <div className={css.imageBox}>
                        <img
                            className={css.img}
                            src={img}
                            alt="car"
                        />
                        <h3 className={css.mainCarTitle}>{brand} {model}, {yea}</h3>
                        <p className={css.id}>Id: {id}</p>
                        <p className={css.address}>{address}</p>
                        <p className={css.mileage}>Mileage: {mileage}km</p>
                        <p className={css.price}>${rentalPrice}</p>
                        <p className={css.description}>{description}</p>
                    </div>
                    <div className={css.flexBox}>
                        <h4 className={css.titlepoint}>Rental Conditions: </h4>
                        <div className={css.aboutBox}>
                            <p className={css.minage}>{address}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
