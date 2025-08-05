import css from "./CarDetails.module.css";
import Svg from "../Svg/Svg.jsx"
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
                    <div className={css.imageBox}>
                        <img
                            className={css.img}
                            src={img}
                            alt={`Photo of ${brand}`}
                        />
                    </div>
                    <div className={css.flexBox}>
                        <div className={css.titleBox}>
                    <h3 className={css.mainCarTitle}>{brand} {model}, {year}<span className={css.id}>Id: {id.slice(0, 4)}</span></h3>
                    <div className={css.location}>
                        <Svg name="location" styles={css.svgConditions}/>
                        <p className={css.address}>{address.split(",").slice(1).join(",")}</p>
                        <p className={css.mileage}>Mileage: {mileage?.toLocaleString("en").replace(/,/g, " ")} km</p>
                        </div>
                        <p className={css.price}>${rentalPrice}</p>
                            <p className={css.description}>{description}</p>
                        </div>
                        
                        <div className={css.aboutBox}>
                        <h4 className={css.titlepoint}>Rental Conditions: </h4>
                            <ul className={css.listCond}>
                                {rentalConditions &&
                                    rentalConditions.map((condition, index) =>
                                (
                                        <li className={css.titlepoint} key={index}>
                                            <Svg name="check-circle" styles={css.svgConditions} />
                                            <p className={css.condPoint}>{condition}</p>
                                </li>
                                ))}
                                </ul>
                        </div>
                        <div className={css.aboutBox}>
                            <h4 className={css.titlepoint}>Car Specifications: </h4>
                            <ul className={css.listCond}>
                                <li className={css.listSpecif}>
                                    <Svg name="calendar" styles={css.svgConditions} />
                                    <p>Year: {year}</p>
                                </li>
                                <li>
                                    <Svg name="car" styles={css.svgConditions} />
                                    <p>Type: {type}</p>
                                </li>
                                <li>
                                    <Svg name="fuel-pump" styles={css.svgConditions} />
                                    <p>Fuel Consumption: {fuelConsumption}</p>
                                </li>
                                <li>
                                    <Svg name="gear" styles={css.svgConditions} />
                                    <p>Engine Size: {engineSize}</p>
                                </li>
                            </ul>
                        </div>

                        <div className={css.aboutBox}>
                            <h4 className={css.titlepoint}>Accessories and functionalities: </h4>
                            <ul className={css.listCond}>
                                {accessories &&
                                    accessories.map((accessory, index) => (
                                        <li className={css.titlepoint} key={index}>
                                            <Svg name="check-circle" styles={css.svgConditions} />
                                            <p className={css.condPoint}>{accessory}</p>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                    </div>
                </div>
    );
}
