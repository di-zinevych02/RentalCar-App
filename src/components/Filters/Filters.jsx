import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../redux/brands/operations.js";
import { selectBrands, selectBrandsStatus, selectBrandsError } from "../../redux/brands/selectors.js";
import { fetchByFilters } from "../../redux/cars/operations.js";
import { toast } from "react-hot-toast";

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

  const handleSearch = async () => {
    const baseParams = { page: 1, limit: 12 };
      const { brand, rentalPrice, minMileage, maxMileage } = filters;
      

  // 1. Спроба знайти за всіма фільтрами (AND)
  const response = await dispatch(
    fetchByFilters({
      ...baseParams,
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    })
  );

  const cars = response.payload?.cars ?? [];

  if (cars.length > 0) return;

  // 2. Якщо не знайдено — пробуємо по одному фільтру

  // Спроба 2.1: тільки за брендом
  if (brand) {
    const brandRes = await dispatch(fetchByFilters({ ...baseParams, brand }));
    if (brandRes.payload?.cars?.length > 0) return;
  }

  // Спроба 2.2: тільки за ціною
  if (rentalPrice) {
    const priceRes = await dispatch(fetchByFilters({ ...baseParams, rentalPrice }));
    if (priceRes.payload?.cars?.length > 0) return;
  }

  // Спроба 2.3: тільки за пробігом
  if (minMileage || maxMileage) {
    const mileageRes = await dispatch(
      fetchByFilters({ ...baseParams, minMileage, maxMileage })
    );
    if (mileageRes.payload?.cars?.length > 0) return;
  }

  toast("No cars found for selected filters");
};

    const formatNumber = (value) => {
  const number = value.replace(/\D/g, ""); // видаляє все, крім цифр
  return new Intl.NumberFormat("en-US").format(Number(number));
};

const parseNumber = (value) => {
  return value.replace(/[^0-9]/g, ""); // тільки цифри для відправки
};

const handleMileageChange = (e) => {
  const { name, value } = e.target;
  const numericValue = parseNumber(value);
  setFilters((prev) => ({
    ...prev,
    [name]: numericValue,
  }));
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
            <input type="text"
                name="minMileage"
                value={formatNumber(filters.minMileage)}
                onChange={handleMileageChange}
                placeholder={filters.minMileage ? formatNumber(filters.minMileage) : "From"}
            />
            <input type="text"
                name="maxMileage"
                value={formatNumber(filters.maxMileage)}
                onChange={handleMileageChange}
                placeholder={filters.maxMileage ? formatNumber(filters.maxMileage) : "To"}
            />
            <button type="button" onClick={handleSearch}>
        Search
      </button>
        </form>
    )
}