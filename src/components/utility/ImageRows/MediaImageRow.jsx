import { BASE_IMAGE_URL } from "../../../constants/constants";

import styles from "../../../styles/utility/ImageRow/ImageRow.module.css";

import { Link } from "react-router-dom";

const MediaImageRow = (props) => {
    const { title, media, basePath } = props;

    return (
        <div>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.container}>
                {media.map((mediaInfo, index) => (
                    <Link
                        key={`${index}-${mediaInfo.title}`}
                        to={`${basePath}/${mediaInfo.id}`}
                        className={styles.link}
                    >
                        {mediaInfo.poster ? (
                            <img
                                className={styles.slider_image}
                                src={BASE_IMAGE_URL + mediaInfo.poster}
                                alt={`${mediaInfo.title} poster`}
                            />
                        ) : (
                            <div className={styles.no_image_found}>
                                <h5>{mediaInfo.title}</h5>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MediaImageRow;
