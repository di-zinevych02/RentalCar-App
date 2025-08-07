import css from "./CarDetails.module.css";
import Svg from "../Svg/Svg.jsx";
import BookForm from "../../components/BookForm/BookForm.jsx";
export default function CarDetails({car}) {
    const {
    brand,
    model,
    year,
    id,
    address,
    mileage,
    rentalPrice,
    description,
        img,
        rentalConditions,
        type,
        fuelConsumption,
        engineSize,
        accessories
    
    } = car;
    return (
        <div className={css.carContainer}>
            <div className={css.leftColumn}>
            
                        <img
                            className={css.img}
                            src={img}
                            alt={`Photo of ${brand}`}
                />
            <div className={css.bookWrapper}>
                <BookForm />
                </div>
                </div>
                    <div className={css.flexBox}>
                        <div className={css.titleBox}>
                    <h2 className={css.mainCarTitle}>{brand} {model}, {year}</h2>
                    <p className={css.id}>Id: {id.slice(0, 4)}</p>
                    </div>
                    <div className={css.location}>
                        <Svg name="location" styles={css.svgConditions}/>
                        <p className={css.address}>{address.split(",").slice(1).join(",")}</p>
                        <p className={css.mileage}>Mileage: {mileage?.toLocaleString("en").replace(/,/g, " ")} km</p>
                        </div>
                        <p className={css.price}>${rentalPrice}</p>
                            <p className={css.description}>{description}</p>
                        
                        <div className={css.containerBox}>
                        <div className={css.aboutBox}>
                        <h3 className={css.titlepoint}>Rental Conditions: </h3>

                            <ul className={css.listCond}>
                                {rentalConditions &&
                                    rentalConditions.map((condition, index) =>
                                (
                                        <li className={css.descrItem} key={index}>
                                            
                                            <Svg name="check-circle" styles={css.svgConditions} />
                                                <p className={css.condPoint}>{condition}</p>   
                                </li>
                                ))}
                        </ul>
                        </div>
                        <div className={css.aboutBox}>
                            <h3 className={css.titlepoint}>Car Specifications: </h3>
                            <ul className={css.listCond}>
                                <li className={css.descrItem}>
                                    <Svg name="calendar" styles={css.svgConditions} />
                                    <p className={css.condPoint}>Year: {year}</p>
                                </li>
                                <li className={css.descrItem}>
                                    <Svg name="car" styles={css.svgConditions} />
                                    <p className={css.condPoint}>Type: {type}</p>
                                </li>
                                <li className={css.descrItem}>
                                    <Svg name="fuel-pump" styles={css.svgConditions} />
                                    <p className={css.condPoint}>Fuel Consumption: {fuelConsumption}</p>
                                </li>
                                <li className={css.descrItem}>
                                    <Svg name="gear" styles={css.svgConditions} />
                                    <p className={css.condPoint}>Engine Size: {engineSize}</p>
                                </li>
                            </ul>
                        </div>
                        <div className={css.aboutBox}>
                            <h3 className={css.titlepoint}>Accessories and functionalities: </h3>
                            <ul className={css.listCond}>
                                {accessories &&
                                    accessories.map((accessory, index) => (
                                        <li className={css.descrItem} key={index}>
                                            <Svg name="check-circle" styles={css.svgConditions} />
                                            <p className={css.condPoint}>{accessory}</p>
                                        </li>
                                    ))}
                            </ul>
                    </div>
                    </div>
                </div>
                </div>
    );
}
