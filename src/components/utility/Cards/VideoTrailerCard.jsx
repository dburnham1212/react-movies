import { Card } from "@mui/material";
import styles from "../../../styles/utility/Cards/VideoTrailerCard.module.css";

const VideoTrailerCard = (props) => {
    const { videoInfo, index, setOpen } = props;
    return (
        <>
            <Card className={styles.card}>
                <img
                    onClick={() => setOpen(index)}
                    className={styles.main_image}
                    src={`http://img.youtube.com/vi/${videoInfo.key}/0.jpg`}
                    alt={videoInfo.name}
                />
                <h5 className={styles.title_text}>{videoInfo.name}</h5>
            </Card>
        </>
    );
};

export default VideoTrailerCard;
