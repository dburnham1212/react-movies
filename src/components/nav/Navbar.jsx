import styles from "../../styles/nav/Navbar.module.css";
import { Link } from "react-router-dom";

import { userContext } from "../context/UserContext";
import { useContext } from "react";
import { Avatar } from "@mui/material";

const Navbar = () => {
    const { login, logout, userName, isAuthenticated } = useContext(userContext);
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
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
            <div className={styles.right}>
                {isAuthenticated() ? (
                    <>
                        <p className={styles.nav_link} onClick={logout}>
                            Sign Out
                        </p>
                        <p>{userName}</p>
                        <Avatar sx={{ bgcolor: "#fea423", mx: ".5rem" }}>{userName.slice(0, 1).toUpperCase()}</Avatar>
                    </>
                ) : (
                    <p className={styles.nav_link} onClick={login}>
                        Sign In
                    </p>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
