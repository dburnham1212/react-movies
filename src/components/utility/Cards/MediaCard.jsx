import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Cards/MediaCard.module.css";
import { Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MediaCard = (props) => {
    const { media } = props;
    return (
        <>
            <Card sx={{ padding: ".5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <a href={`/${media.media_type}/${media.id}`}>
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
                    {media.media_type === "person" ? (
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
                    )}
                    <h4 className={styles.title_text}>{`${media.title || media.name}`}</h4>
                </div>
            </Card>
        </>
    );
};

export default MediaCard;
