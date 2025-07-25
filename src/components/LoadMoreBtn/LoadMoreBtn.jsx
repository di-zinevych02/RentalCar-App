import css from "./LoadMoreBtn.module.css";
import Container from "../Container/Container.jsx";

export default function LoadMoreBtn({ onClick }) {
    return (
    <Container>
        <button className={css.button} onClick={onClick}>Load more</button>
    </Container>
    );
}
