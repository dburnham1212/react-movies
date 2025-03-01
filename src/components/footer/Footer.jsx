import { Link } from "react-router-dom";
import styles from "../../styles/footer/Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.column_container}>
                    <h4 className={styles.heading}>Navigation</h4>
                    <Link className={styles.footer_link} to={"/"}>
                        Home
                    </Link>
                    <Link className={styles.footer_link} to={"/browse"}>
                        Browse
                    </Link>
                    <Link className={styles.footer_link} to={"/search"}>
                        Search
                    </Link>
                </div>
                <div className={styles.column_container}>
                    <h4 className={styles.heading}>Contributors</h4>
                    <a
                        href="https://github.com/dburnham1212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        <GitHubIcon fontSize="small" />
                        Dylan Burnham
                    </a>
                    <a
                        href="https://github.com/Andrew-Kim-1128"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        <GitHubIcon fontSize="small" />
                        Andrew Kim
                    </a>
                    <a
                        href="https://github.com/Tania-6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        <GitHubIcon fontSize="small" />
                        Tania Horvat
                    </a>
                    <a
                        href="https://github.com/J-Pilla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        <GitHubIcon fontSize="small" />
                        Jason Pilla
                    </a>
                </div>
                <div className={styles.column_container}>
                    <h4 className={styles.heading}>API's Used</h4>
                    <a
                        href="https://developer.themoviedb.org/docs/getting-started"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        TMDB
                    </a>
                    <a
                        href="https://flagsapi.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconed_footer_link}
                    >
                        Flags
                    </a>
                </div>
            </div>
        </>
    );
};

export default Footer;
