import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { fetchBrands } from "../../services/fetchBrands.js";
import { fetchByFilters } from "../../redux/filters/operations.js";
import { selectFiltersValue, selectFiltersLoading, selectFiltersError } from "../../redux/filters/selectors.js";
import {setFilters} from "../../redux/filters/slice.js";
import css from "./Filters.module.css";
import Loader from "../Loader/Loader.jsx";
import Button from "../Button/Button.jsx"

export default function Filters() {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const error = useSelector(selectFiltersError);
  const loading = useSelector(selectFiltersLoading);
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
  const parseNumber = (value) => value.replace(/\D/g, "");
  const handleMileageChange = (e) => {
    const { name, value } = e.target
    const numeric = parseNumber(value);
    dispatch(setFilters({ name, value: numeric }));
  };
  const handleSearch = () => {
    dispatch(fetchByFilters({ page: 1, limit: 12, ...filters }));
  };

    return (
      <div className={css.container}>
        <form className={css.form}>
          {loading && <Loader/>}
          {error && <ErrorMessage error={error} />}
          <label htmlFor="brand-select" className={css.label}>
            Car brand
                <select className={css.select} id="brand-select" name='brand' value={filters.brand} onChange={handleChange}>
                    <option value="">Choose a brand</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
            </select>
          </label>
          <label htmlFor="price-select" className={css.label}>
            Price/ 1 hour
          <select className={css.select} id="price-select" name='rentalPrice' value={filters.rentalPrice} onChange={handleChange}>
                    <option value="">Choose a price</option>
                    {Array.from({ length: 18 }, (_, i) => 30 + i * 10).map((price) => (
                        <option key={price} value={price}>${price}</option>
                    ))}
            </select>
          </label>
          <label  className={css.label}>
          Car mileage / km
            <div className={css.containerMileage}>
              <input
                className={css.input}
                type="text"
                name="minMileage"
                value={filters.minMileage}
                onChange={handleMileageChange}
                placeholder="From"
                pattern="[0-9]*"
              />
              <input
                className={css.input}
                type="text"
                name="maxMileage"
                value={filters.maxMileage}
                onChange={handleMileageChange}
                placeholder="To"
                pattern="[0-9]*"
              />
              </div>
          </label>
          <Button type="button" onClick={handleSearch}>
                    Search
          </Button>
          <Button type="button" onClick={handleSearch}>
                    Reset
          </Button>
            </form>
        </div>
    );
}