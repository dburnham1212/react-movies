import styles from "../../styles/nav/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.nav_link} to="/">
        Home
      </Link>
      <Link className={styles.nav_link} to="/browse">
        Browse
      </Link>
      <Link className={styles.nav_link} to="/search">
        Search
      </Link>
    </nav>
  );
};

export default Navbar;
