import styles from "../../styles/nav/Navbar.module.css";
import { Link } from "react-router-dom";

import { userContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const { login, logout, userName, isAuthenticated } = useContext(userContext);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: 800px)`);

        const handleResize = (e) => {
            if (e.matches) {
                setMenuOpen(false); // force close on desktop
            }
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link className={styles.nav_link} to="/">
                    <img src={process.env.PUBLIC_URL + "/images/ReactMoviesLogo.png"} alt="React Movies Logo" />
                </Link>
                <div className={styles.desktop_links}>
                    <Link className={styles.nav_link} to="/">
                        Home
                    </Link>
                    <Link className={styles.nav_link} to="/browse">
                        Browse
                    </Link>
                    <Link className={styles.nav_link} to="/search">
                        Search
                    </Link>
                    {isAuthenticated() && (
                        <Link className={styles.nav_link} to="/lists">
                            Lists
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.right}>
                {/* Hamburger */}
                <button className={styles.menu_button} onClick={() => setMenuOpen((prev) => !prev)}>
                    <MenuIcon />
                </button>
                {isAuthenticated() ? (
                    <>
                        <div className={styles.desktop_links}>
                            <p className={styles.nav_link} onClick={logout}>
                                Sign Out
                            </p>
                            <p>{userName}</p>
                        </div>
                        <Avatar sx={{ bgcolor: "#fea423", mx: ".5rem" }}>{userName.slice(0, 1).toUpperCase()}</Avatar>
                    </>
                ) : (
                    <div className={styles.desktop_links}>
                        <p className={styles.nav_link} onClick={login}>
                            Sign In
                        </p>
                    </div>
                )}
            </div>

            <div className={`${styles.mobile_menu} ${menuOpen ? styles.open : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link to="/browse" onClick={() => setMenuOpen(false)}>
                    Browse
                </Link>
                <Link to="/search" onClick={() => setMenuOpen(false)}>
                    Search
                </Link>

                {isAuthenticated() && (
                    <Link to="/lists" onClick={() => setMenuOpen(false)}>
                        Lists
                    </Link>
                )}

                {isAuthenticated() ? (
                    <button onClick={logout}>Sign Out</button>
                ) : (
                    <button onClick={login}>Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
