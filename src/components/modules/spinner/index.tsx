import style from "./spinner.module.scss";

export default function Spinner() {
  return (
    <div className={style.loader}>
      <div className={style.loader_spinner}></div>
    </div>
  );
}
