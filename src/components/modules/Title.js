import styles from "@/modules/Title.module.css";

function Title({ children }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export default Title;
