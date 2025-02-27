import { useEffect, useRef, useState } from "react";
import { BASE_IMAGE_URL, HD_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Carousels/ImageCarousel.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { grey } from "@mui/material/colors";

const ImageCarousel = (props) => {
    const { images, imageIndex, setImageIndex, mediaTitle } = props;

    const boxRef = useRef(null);

    useEffect(() => {
        console.log("===== Trending Movies =====");
        console.log(images);
    }, []);

    const showNextImage = () => {
        setImageIndex((index) => {
            if (index === images.length - 1) return 0;
            return index + 1;
        });
    };

    const showPrevImage = () => {
        setImageIndex((index) => {
            if (index === 0) return images.length - 1;
            return index - 1;
        });
    };

    return (
        <>
            <div style={{ width: "100%", height: "85%", position: "relative" }}>
                <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
                    {images.map((image, index) => {
                        return (
                            <div
                                key={index}
                                style={{ translate: `${-100 * imageIndex}%` }}
                                className={styles.img_slider_container}
                            >
                                <img
                                    src={`${HD_IMAGE_URL}${image.file_path}`}
                                    alt={`${mediaTitle} backdrop ${index}`}
                                    className={styles.img_slider_img}
                                />
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
            </div>
            <div className={styles.img_slider_img_btn_container} ref={boxRef}>
                {images.map((image, index) => {
                    return (
                        <button
                            key={index}
                            className={`${styles.img_slider_img_btn} ${
                                index === imageIndex && styles.img_slider_img_btn_active
                            }`}
                            onClick={() => setImageIndex(index)}
                        >
                            <img
                                className={styles.img_slider_img_btn_img}
                                src={`${BASE_IMAGE_URL}${image.file_path}`}
                                alt={`${mediaTitle} mini backdrop ${index}`}
                            />
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default ImageCarousel;
