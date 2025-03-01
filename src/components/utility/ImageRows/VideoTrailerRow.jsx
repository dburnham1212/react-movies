import VideoTrailerCard from "../Cards/VideoTrailerCard";
import styles from "../../../styles/utility/ImageRow/ImageRow.module.css";

const VideoTrailerRow = (props) => {
    const { videos, setOpen } = props;
    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>Videos</h4>
            <div className={styles.container}>
                {videos?.map((video, index) => (
                    <VideoTrailerCard key={index} videoInfo={video} index={index} setOpen={setOpen} />
                ))}
            </div>
        </>
    );
};

export default VideoTrailerRow;
