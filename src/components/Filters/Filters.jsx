import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux/brands/operations.js";
import { selectBrands, selectBrandsStatus, selectBrandsError } from "../../redux/brands/selectors.js";
import { fetchByFilters } from "../../redux/cars/operations.js";

export default function Filters() {
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);
    const status = useSelector(selectBrandsStatus);
    const error = useSelector(selectBrandsError);
    useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBrands());
    }
  }, [status, dispatch]);

  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

    const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(fetchByFilters({ page: 1, ...filters }));
  };
    return (
        <form>
            {status === "loading" && <p>Loading brands...</p>}
            {status === "failed" && <p>Error loading brands: {error}</p>}
            <select name='brand' value={filters.brand} onChange={handleChange}>
                <option value="">Choose a brand</option>
                {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                ))}
            </select>
            <select name='rentalPrice' value={filters.rentalPrice} onChange={handleChange}>
                <option value="">Choose a price</option>
                {Array.from({ length: 18 }, (_, i) => 30 + i * 10).map((price) => (
          <option key={price} value={price}>${price}</option>
        ))}
            </select>
            <input type="number"
                name="minMileage"
                value={filters.minMileage}
                onChange={handleChange}
                placeholder="From"
            />
            <input type="number"
                name="maxMileage"
                value={filters.maxMileage}
                onChange={handleChange}
                placeholder="To"
            />
            <button type="button" onClick={handleSearch}>
        Search
      </button>
        </form>
    )
}