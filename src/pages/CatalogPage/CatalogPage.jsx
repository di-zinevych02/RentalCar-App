import css from "./CatalogPage.module.css";
import Container from "../../components/Container/Container.jsx";
import CarList from "../../components/CarList/CarList.jsx";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  selectCarsLoading,
    selectCarsError,
  selectFilteredPagination,
    selectActiveFilters, 
  selectFilteredCars,selectNoResults
} from "../../redux/cars/selectors.js";
import { fetchByFilters } from "../../redux/cars/operations.js";

import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Filters from "../../components/Filters/Filters.jsx";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const filteredCars = useSelector(selectFilteredCars);
  const loading = useSelector(selectCarsLoading);
    const error = useSelector(selectCarsError);
    const filters = useSelector(selectActiveFilters);
  const { page, totalPages } = useSelector(selectFilteredPagination);
const noResults = useSelector(selectNoResults);
  const hasShownEndToast = useRef(false);

  useEffect(() => {
    dispatch(fetchByFilters({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

 useEffect(() => {
    if (
      !loading &&
      filteredCars.length > 0 &&
      page >= totalPages &&
      !hasShownEndToast.current
    ) {
      toast("All cars loaded");
      hasShownEndToast.current = true;
    }
  }, [loading, filteredCars, page, totalPages]);

 
  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchByFilters({ page: page + 1, ...filters  }));
      hasShownEndToast.current = false;
    }
  };

  return (
    <div className={css.catalogwrapper}>
          <Container>
              <Filters />
        <CarList items={filteredCars} />
              {loading && <Loader />}
              {noResults && <p>No cars found with choosen filters</p>}
              {!loading && filteredCars.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
    </Container>
    </div>
  );
}
