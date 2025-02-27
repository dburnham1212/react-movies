import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/ImageRow/ImageRow.module.css";
// Used to return an index to the parent on a mouse click
const IndexedImageRow = (props) => {
    const { title, setOpen, media } = props;

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>{title}</h4>
            <div className={styles.container}>
                {media.map((mediaInfo, index) => (
                    <img
                        onClick={() => setOpen(index)}
                        key={index}
                        className={styles.slider_image_small_clickable}
                        src={BASE_IMAGE_URL + mediaInfo.file_path}
                        alt={`poster`}
                    />
                ))}
            </div>
        </>
    );
};

export default IndexedImageRow;
