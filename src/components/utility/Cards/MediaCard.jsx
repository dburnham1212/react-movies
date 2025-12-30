import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Cards/MediaCard.module.css";
import { Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MediaCard = (props) => {
    const { media, displayType, mediaType } = props;
    return (
        <>
            <Card className={styles.card}>
                <div className={styles.card_hidden}>
                    <a className={styles.hidden_link} href={`/${media.media_type || mediaType}/${media.id}`}>
                        <div className={styles.hidden_overlay}>
                            {media.media_type && media.media_type === "person" ? (
                                <>
                                    <h4 className={styles.title_text}>Name:</h4>
                                    <p className={styles.title_text}>
                                        {media.name !== media.original_name
                                            ? `${media.name} / ${media.original_name}`
                                            : media.name}
                                    </p>

                                    <h4 className={styles.title_text}>Department:</h4>
                                    <p className={styles.title_text}>{media.known_for_department}</p>

                                    {media?.known_for?.length && (
                                        <>
                                            <h4 className={styles.title_text}>Known For:</h4>
                                            <p className={styles.title_text}>
                                                {media?.known_for?.map((item) => item.title || item.name).join(", ")}
                                            </p>
                                        </>
                                    )}

                                    <h4 className={styles.title_text}>Popularity:</h4>
                                    <p className={styles.title_text}>{media.popularity.toFixed(1)}</p>
                                </>
                            ) : (
                                <>
                                    <h4 className={styles.title_text}>Title:</h4>
                                    <p className={styles.title_text}>{media.title}</p>

                                    <h4 className={styles.title_text}>Description:</h4>
                                    <p className={`${styles.title_text} ${styles.hidden_description_text}`}>
                                        {media.overview || "None"}
                                    </p>
                                </>
                            )}
                        </div>
                        <img
                            className={styles.hidden_image}
                            src={`${
                                media.poster_path || media.profile_path
                                    ? BASE_IMAGE_URL + (media.poster_path || media.profile_path)
                                    : "/images/NO_IMAGE_FOUND.jpg"
                            }`}
                            alt={media.title || media.name}
                        />
                    </a>
                </div>
                <a href={`/${media.media_type || mediaType}/${media.id}`}>
                    <img
                        className={styles.main_image}
                        src={`${
                            media.poster_path || media.profile_path
                                ? BASE_IMAGE_URL + (media.poster_path || media.profile_path)
                                : "/images/NO_IMAGE_FOUND.jpg"
                        }`}
                        alt={media.title || media.name}
                    />
                </a>
                <div className={styles.lower_container}>
                    {displayType ? (
                        media.media_type === "person" ? (
                            <>
                                <h4 className={styles.title_text}>{`(${
                                    media.media_type.slice(0, 1).toUpperCase() + media.media_type.slice(1)
                                })`}</h4>
                            </>
                        ) : (
                            <>
                                <div className={styles.rating_type_box}>
                                    <h4 className={styles.title_text}>{`(${
                                        media.media_type.slice(0, 1).toUpperCase() + media.media_type.slice(1)
                                    })`}</h4>
                                    <div className={styles.title_text}>
                                        <StarIcon sx={{ fontSize: "medium", color: "#fea423" }} />
                                        <span>{Number(media.vote_average / 2).toFixed(1)}</span>
                                    </div>
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            {media.media_type !== "person" && (
                                <div className={styles.title_text}>
                                    <StarIcon sx={{ fontSize: "medium", color: "#fea423" }} />
                                    <span>{Number(media.vote_average / 2).toFixed(1)}</span>
                                </div>
                            )}
                        </>
                    )}
                    <h4 className={styles.title_text}>{`${media.title || media.name}`}</h4>
                </div>
            </Card>
        </>
    );
};

export default MediaCard;
