import styles from "./MobileMenu.module.scss";

export default function MobileMenu() {
  return (
    <ul className={`card ${styles.menuContainer}`}>
      <li>Favorites</li>
      <li>Login</li>
    </ul>
  );
}
