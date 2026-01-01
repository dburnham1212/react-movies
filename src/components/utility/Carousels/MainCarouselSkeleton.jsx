import styles from "../../../styles/utility/Carousels/Carousel.module.css";

import { Skeleton } from "@mui/material";

const MainCarouselSkeleton = (props) => {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflow: "hidden",
                }}
            >
                <div className={styles.img_slider_container}>
                    {/* Backdrop */}
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{ position: "absolute", inset: 0 }}
                    />

                    {/* Overlay content */}
                    <div className={styles.img_slider_details}>
                        <Skeleton variant="text" width="60%" height={60} />
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="85%" height={20} />
                        <Skeleton variant="text" width="30%" height={18} />

                        <Skeleton
                            variant="rectangular"
                            width={100}
                            height={36}
                            sx={{ marginTop: "1rem", borderRadius: "4px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCarouselSkeleton;
