import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Cards/MediaCard.module.css";

const { Card } = require("@mui/material");

const MediaCard = (props) => {
    const { media } = props;
    return (
        <>
            <Card sx={{ padding: ".5rem" }}>
                <img
                    className={styles.main_image}
                    src={`${BASE_IMAGE_URL}${media.poster_path || media.profile_path}`}
                    alt={media.title || media.name}
                />
                <h4>{media.title || media.name}</h4>
            </Card>
        </>
    );
};

export default MediaCard;
