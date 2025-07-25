import css from "./CatalogPage.module.css";
import Container from "../../components/Container/Container.jsx";
import CarList from "../../components/CarList/CarList.jsx";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  selectAllCars,
  selectCarsLoading,
  selectPagination,
  selectCarsError,
} from "../../redux/cars/selectors.js";
import { fetchCars } from "../../redux/cars/operations.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../../components/Loader/Loader.jsx";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const allCars = useSelector(selectAllCars);
  const loading = useSelector(selectCarsLoading);
  const error = useSelector(selectCarsError);
  const { page, totalPages } = useSelector(selectPagination);

  const hasShownEndToast = useRef(false);

  // Завантаження першої сторінки
  useEffect(() => {
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  // Показати toast при помилці
  useEffect(() => {
    if (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  }, [error]);

  // Показати toast, коли всі машини завантажено
  useEffect(() => {
    if (
      !loading &&
      page >= totalPages &&
      allCars.length > 0 &&
      !hasShownEndToast.current
    ) {
      toast("All cars loaded");
      hasShownEndToast.current = true;
    }
  }, [page, totalPages, loading, allCars]);

  // Клік на кнопку "Load More"
  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchCars({ page: page + 1 }));
      hasShownEndToast.current = false;
    }
  };

  return (
    <div className={css.catalogwrapper}>
      <h2>{allCars.length} cars loaded</h2>
      <Container>
        <CarList items={allCars} />
        {loading && <Loader />}
        {!loading && allCars.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </Container>
    </div>
  );
}
