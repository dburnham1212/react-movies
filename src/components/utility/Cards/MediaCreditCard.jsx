import { Card } from "@mui/material";
import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Cards/MediaCreditCard.module.css";
import { Link } from "react-router-dom";

const MediaCreditCard = (props) => {
    const { media, mediaType, creditType } = props;

    return (
        <>
            <Card className={styles.card}>
                <img
                    src={`${
                        media.poster_path || media.profile_path
                            ? BASE_IMAGE_URL + (media.poster_path || media.profile_path)
                            : process.env.PUBLIC_URL + "/images/NO_IMAGE_FOUND.jpg"
                    }`}
                    alt={media.original_title}
                />
                <h4>{media.title}</h4>
                <div className={styles.card_hidden}>
                    <Link className={styles.hidden_link} to={`/${mediaType}/${media.id}`}>
                        <div className={styles.hidden_overlay}>
                            <h4>Title:</h4>
                            <p>{media.title || media.name}</p>
                            <h4>Role(s):</h4>
                            {creditType === "CA" ? (
                                <p className={styles.hidden_role_text}>{media.character || "None"}</p>
                            ) : (
                                <p className={styles.hidden_role_text}>
                                    {media.jobs ? media.jobs.join(", ") : media.job || "None"}
                                </p>
                            )}
                            <h4>Description:</h4>
                            <p className={styles.hidden_description_text}>{media.overview || "None"}</p>
                        </div>
                        <img
                            className={styles.hidden_image}
                            src={`${
                                media.poster_path || media.profile_path
                                    ? BASE_IMAGE_URL + (media.poster_path || media.profile_path)
                                    : process.env.PUBLIC_URL + "/images/NO_IMAGE_FOUND.jpg"
                            }`}
                            alt={media.title || media.name}
                        />
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default MediaCreditCard;
