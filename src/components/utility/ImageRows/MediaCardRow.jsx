import MediaCard from "../Cards/MediaCard";
import styles from "../../../styles/utility/ImageRow/ImageRow.module.css";

const MediaCardRow = (props) => {
    // media - the object that we are using to display
    // displayType - should we display the type on the card?
    // mediaType - movie, tv, or person
    // size - N = normal, L = large
    const { media, title, mediaType, size } = props;
    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>{title}</h4>
            <div className={styles.card_row}>
                {media?.map((movie, index) => {
                    return (
                        <div
                            key={index}
                            className={size === "N" ? styles.medium_card_container : styles.large_card_container}
                        >
                            <MediaCard media={movie} displayType={false} mediaType={mediaType} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MediaCardRow;
