import css from "./MainButton.module.css";
import Container from "../Container/Container.jsx";

export default function MainButton({ children }) {
    return (
    <Container>
        <button className={css.button}>{children}</button>
    </Container>
    );
}
