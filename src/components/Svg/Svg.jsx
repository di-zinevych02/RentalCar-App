import sprite from "../../assets/sprite.svg";
export default function Svg({ onClick = null, styles, name }) {
  return (
    <svg onClick={onClick} className={styles}>
      <use href={`${sprite}#icon-${name}`}></use>
    </svg>
  );
}