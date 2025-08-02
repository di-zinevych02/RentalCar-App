import Container from "../../components/Container/Container.jsx";
import css from "./MainPage.module.css";
import LinkButton from "../../components/LinkButton/LinkButton.jsx";
export default function MainPage() {
    return (
        <section className={css.section}>
            <Container>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.description}>Reliable and budget-friendly rentals for any journey</p>
            <div className={css.linkbtn}>
                    <LinkButton to={`/catalog`}>View Catalog</LinkButton>
                </div>
            </Container>
        </section>
    );
};