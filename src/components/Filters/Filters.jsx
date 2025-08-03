import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchBrands } from "../../services/fetchBrands.js";
import { fetchByFilters } from "../../redux/filters/operations.js";
import { selectFiltersValue} from "../../redux/filters/selectors.js";
import {setFilters, resetFilters } from "../../redux/filters/slice.js";
import css from "./Filters.module.css";
import Button from "../Button/Button.jsx";

export default function Filters() {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);

  const filters = useSelector(selectFiltersValue);

    useEffect(() => {
        async function getBrands() {
            try {
                const data = await fetchBrands();
                setBrands(data);
            } catch (error) {
                toast.error(`Failed to load brands: ${error}`);
            }
        }
        getBrands();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({name, value }));
  };
  const handleMileageChange = (e) => {
  const { name, value } = e.target;
  // Видаляємо всі символи, крім цифр
  const numericValue = value.replace(/\D/g, "");
  // Форматуємо з комами (тільки якщо щось ввели)
  const formattedValue = numericValue
    ? Number(numericValue).toLocaleString("en-US")
    : "";
  dispatch(setFilters({ name, value: formattedValue }));
};

  const handleSearch = () => {
    const cleanMileage = (val) => val.replace(/,/g, "");
    dispatch(fetchByFilters({ page: 1, limit: 12, ...filters, minMileage: cleanMileage(filters.minMileage),
      maxMileage: cleanMileage(filters.maxMileage), }));
  };
  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(fetchByFilters({ page: 1, limit: 12 }));
  }; 

  return (
      <div className={css.container}>
        <form className={css.form}>
          <div className={css.containerSelect}>
          <label htmlFor="brand-select" className={css.label}>
            Car brand
            <select
              className={css.select}
              id="brand-select"
              name='brand'
              value={filters.brand}
              onChange={handleChange}
            >
                    <option value="">Choose a brand</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
            </select>
            </label>
          </div>
          <div className={css.containerSelect}>
          <label htmlFor="price-select" className={css.label}>
            Price/ 1 hour
          <select className={css.select} id="price-select" name='rentalPrice' value={filters.rentalPrice} onChange={handleChange}>
                    <option value="">Choose a price</option>
                    {Array.from({ length: 18 }, (_, i) => 30 + i * 10).map((price) => (
                        <option key={price} value={price}>${price}</option>
                    ))}
            </select>
            </label>
          </div>
          <div className={css.containerSelect}>
          <label  className={css.label}>
          Car mileage / km
            <div className={css.containerMileage}>
              <input
                className={css.leftInput}
                type="text"
                name="minMileage"
                value={filters.minMileage}
                onChange={handleMileageChange}
                placeholder="From"
                pattern="[0-9]*"
              />
              <input
                className={css.rightInput}
                type="text"
                name="maxMileage"
                value={filters.maxMileage}
                onChange={handleMileageChange}
                placeholder="To"
                pattern="[0-9]*"
              />
              </div>
          </label>
          </div>
          <div className={css.btn}>
          <Button type="button" onClick={handleSearch}>
                    Search
            </Button>
          <Button type="button" onClick={handleReset}>
                    Reset
            </Button>
        </div>
        
      </form>

        </div>
    );
}
