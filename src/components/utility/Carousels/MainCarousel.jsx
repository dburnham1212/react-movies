import { useState } from "react";
import { HD_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Carousels/Carousel.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";

const MainCarousel = (props) => {
    const { mediaData } = props;

    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex((index) => {
            if (index === mediaData.length - 1) return 0;
            return index + 1;
        });
    };

    const showPrevImage = () => {
        setImageIndex((index) => {
            if (index === 0) return mediaData.length - 1;
            return index - 1;
        });
    };

    const goToCorrectPage = (mediaType, id) => {
        window.location = `${mediaType}/${id}`;
    };

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
                {mediaData.map((media, index) => {
                    return (
                        <div
                            key={index}
                            style={{ translate: `${-100 * imageIndex}%` }}
                            className={styles.img_slider_container}
                        >
                            <img
                                src={`${HD_IMAGE_URL}${media.backdrop_path}`}
                                alt={(media.name || media.title) + " backdrop"}
                                className={styles.img_slider_img}
                            />
                            <div className={styles.img_slider_details}>
                                <h1 className={styles.img_slider_title}>{media.name || media.title}</h1>
                                <p className={styles.img_slider_details_text}>{media.overview}</p>
                                <h4>Type: {media.media_type.toUpperCase()}</h4>
                                <Button
                                    onClick={() => goToCorrectPage(media.media_type, media.id)}
                                    variant="contained"
                                    color="warning"
                                >
                                    See More
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={showPrevImage} className={styles.img_slider_btn} style={{ left: 0 }}>
                <ArrowBackIosIcon sx={{ color: grey[50] }} />
            </button>
            <button onClick={showNextImage} className={styles.img_slider_btn} style={{ right: 0 }}>
                <ArrowForwardIosIcon sx={{ color: grey[50] }} />
            </button>
            <div className={styles.img_slider_dot_btn_container}>
                {mediaData.map((_, index) => {
                    return (
                        <button key={index} className={styles.img_slider_dot_btn} onClick={() => setImageIndex(index)}>
                            {index === imageIndex ? (
                                <CircleIcon sx={{ color: grey[50], height: "1rem", width: "1rem" }} />
                            ) : (
                                <CircleOutlinedIcon sx={{ color: grey[50], height: "1rem", width: "1rem" }} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MainCarousel;
