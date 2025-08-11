import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchBrands } from "../../services/fetchBrands.js";
import { fetchByFilters } from "../../redux/filters/operations.js";
import { selectFiltersValue} from "../../redux/filters/selectors.js";
import { setFilters, resetFilters } from "../../redux/filters/slice.js";
import Svg from "../Svg/Svg.jsx";
import Select, { components } from 'react-select';
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
  
  const brandOptions = brands.map((brand) => ({ value: brand, label: brand, }));
  const priceOptions = Array.from({ length: 18 }, (_, i) => 30 + i * 10).map((price) => ({ value: price, label: price, }));
  const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      
      {props.selectProps.menuIsOpen ? <Svg name="uparrow" styles={css.icon } /> : <Svg name="downarrow" styles={css.icon}/>}
    </components.DropdownIndicator>
  );
  };
  //props.selectProps.menuIsOpen це стан, який контролює react-select (відкрито/закрито).
  const handleSelectChange = (selectedOption, name) => {
    dispatch(setFilters({ name, value: selectedOption?.value || "" }));
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
  const getDisplayValue = (name, rawValue) => {
  const prefix = name === "minMileage" ? "From " : "To ";
  return `${prefix}${rawValue}`;
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
          <label htmlFor="brand" className={css.label}>
            Car brand
 </label>
            <Select
              inputId="brand"
              options={brandOptions}
              //підключення кастомного індикатора у селект
            components={{ DropdownIndicator }}
            isSearchable={false}
            placeholder="Choose a brand"
            onChange={(selectedOptions) => handleSelectChange(selectedOptions, "brand")}
            value={brandOptions.find(option => option.value === filters.brand) || null}
            unstyled
              classNames={{
                input: () => css.input,
                container: () => css.select,
                //Основне поле
                control: () => css.control,
              //   //	Дропдаун-меню
                menu: () => css.menu,
              //   //	Контейнер усіх опцій
                menuList: () => css.list,
              //   //Один пункт
                option: () => css.option,
                
              }}
            />
            
          </div>
          <div className={css.containerSelect}>
          <label htmlFor="rentalPrice" className={css.label}>
            Price/ 1 hour</label>
            <Select
              inputId="rentalPrice"
              options={priceOptions}
              
            components={{ DropdownIndicator }}
            isSearchable={false}
            placeholder="Choose a price"
            onChange={(selectedOption) => handleSelectChange(selectedOption, "rentalPrice")}
            value={priceOptions.find(option => option.value === filters.rentalPrice) || null}
            unstyled
              classNames={{
                input: () => css.input,
                container: () => css.select,
                //Основне поле
                control: () => css.control2,
              //   //	Дропдаун-меню
                menu: () => css.menu,
              //   //	Контейнер усіх опцій
                menuList: () => css.list2,
              //   //Один пункт
                option: () => css.option,
              }}
      // форматуємо *і* випадаючий список, і обране значення
      formatOptionLabel={(option, { context }) => {
        if (context === "value") {
          return `To ${option.label}$`; // у полі вводу
        }
        return option.label; // у списку
      }}
            />
          </div>
          <div className={css.containerSelect}>
          <label  className={css.label}>
          Car mileage / km
            <div className={css.containerMileage}>
              <input
                className={css.leftInput}
                type="text"
                name="minMileage"
                value={getDisplayValue("minMileage", filters.minMileage)}
                onChange={handleMileageChange}
                placeholder="From"
                pattern="[0-9]*"
              />
              <input
                className={css.rightInput}
                type="text"
                name="maxMileage"
                value={getDisplayValue("maxMileage", filters.maxMileage)}
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
/* <select
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
    <select className={css.select} id="price-select" name='rentalPrice' value={filters.rentalPrice} onChange={handleChange}>
                    <option value="">Choose a price</option>
                    {Array.from({ length: 18 }, (_, i) => 30 + i * 10).map((price) => (
                        <option key={price} value={price}>${price}</option>
                    ))}
            </select> // */