import styles from "./index.module.css";
import clsx from "clsx";

export default function ClipText({ text }) {
  return (
    <span
      className={clsx(styles["path-text"], "d-block position-relative")}
      data-text={text}
    >
      {text}
    </span>
  );
}
