import css from "./ErrorMessage.module.css";
export default function ErrorMessage() {
  return (
    <div className={css.error}>
      <p className={css.texterror}>
        Whoops there was an error, please reload the page!{" "}
      </p>
    </div>
  );
}