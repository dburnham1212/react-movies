import Skeleton from "@mui/material/Skeleton";

// Style sheet
import styles from "../../../styles/utility/MediaInfo/MediaInfo.module.css";
import { Box } from "@mui/material";

const MediaInfoSkeleton = (props) => {
    const { mediaType } = props;

    const isTvShow = mediaType === "TVShow";
    const isEpisode = mediaType === "episode";

    return (
        <>
            <div className={styles.heading_container}>
                <div className={styles.heading_title_info}>
                    {/* Main title (h1) */}
                    <Skeleton height={48} width="70%" />

                    {/* Secondary title (h3 / show name) */}
                    <Skeleton height={28} width="50%" />

                    {/* Tertiary title (h4 / season name) */}
                    <Skeleton height={22} width="40%" />
                </div>
                <div className={styles.movie_ratings}>
                    <div className={styles.rating_container}>
                        {/* Title */}
                        <Skeleton variant="text" width="60%" height={18} sx={{ margin: "0.25rem auto" }} />

                        {/* Star + rating */}
                        <div className={styles.star_rating}>
                            <Skeleton variant="circular" width={18} height={18} />
                            <Skeleton variant="text" width={40} height={22} sx={{ marginLeft: "0.25rem" }} />
                        </div>

                        {/* Votes */}
                        <Skeleton variant="text" width="50%" height={16} sx={{ margin: "0.1rem auto" }} />
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.content_left}>
                    <Skeleton
                        variant="rectangular"
                        component="div"
                        sx={{
                            minWidth: "300px",
                            maxWidth: "360px",
                            aspectRatio: isEpisode ? "16/9" : "2/3",
                            height: "100%",
                            display: "block",
                            maxHeight: isEpisode ? "200px" : "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className={styles.content_right}>
                    <div id={styles.right_upper_content}>
                        {/* Tagline */}
                        <Skeleton variant="text" width="80%" height={32} sx={{ marginBottom: "1.5rem" }} />

                        {/* Overview */}
                        <Skeleton variant="text" width="100%" height={32} sx={{ marginBottom: "0.25rem" }} />
                        <Skeleton variant="text" width="95%" height={32} sx={{ marginBottom: "0.25rem" }} />
                        <Skeleton variant="text" width="90%" height={32} sx={{ marginBottom: "0.25rem" }} />

                        {/* Genres */}
                        <div className={styles.genre_container}>
                            <Skeleton variant="text" width="40%" height={32} sx={{ marginBottom: "0.25rem" }} />
                            <Skeleton variant="text" width="60%" height={32} />
                        </div>
                    </div>

                    <div id={styles.right_lower_content}>
                        <div className={styles.lower_content_line}>
                            <Skeleton variant="text" width="100%" height={32} />
                        </div>

                        {isTvShow && (
                            <div className={styles.lower_content_line}>
                                <Skeleton variant="text" width="100%" height={32} />
                            </div>
                        )}

                        <div className={styles.lower_content_line}>
                            <Skeleton variant="text" width="100%" height={32} />
                        </div>

                        <div className={styles.lower_content_line}>
                            <Skeleton variant="text" width="100%" height={32} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaInfoSkeleton;
