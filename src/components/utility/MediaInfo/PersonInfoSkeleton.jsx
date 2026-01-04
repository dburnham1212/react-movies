import { Box, Skeleton } from "@mui/material";
import styles from "../../../styles/utility/MediaInfo/PersonInfo.module.css";
import { BASE_IMAGE_URL } from "../../../constants/constants";
import SocialsList from "../Socials/SocailsList";
const PersonInfoSkeleton = (props) => {
    return (
        <>
            <div className={styles.heading_container}>
                <Skeleton height={60} width="50%" />
            </div>
            <div className={styles.flex_info_container}>
                <div className={styles.info_left}>
                    <Skeleton
                        variant="rectangular"
                        component="div"
                        sx={{
                            minWidth: "300px",
                            maxWidth: "450px",
                            aspectRatio: "2/3",
                            height: "100%",
                            display: "block",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className={styles.info_right}>
                    {/* Known Aliases */}
                    <div className={styles.info_right_section}>
                        <div className={styles.aliases}>
                            <Skeleton height={32} width="30%" />
                            <Skeleton height={30} width="80%" />
                        </div>
                    </div>

                    {/*Birth Details*/}
                    <div className={styles.info_right_section}>
                        <div className={styles.details}>
                            <Skeleton height={32} width="30%" />
                            <Skeleton height={30} width="80%" />
                        </div>
                    </div>

                    <div className={styles.info_right_section}>
                        {/*Biography */}
                        <Skeleton height={32} width="30%" />
                        <Skeleton height={30} width="100%" />
                        <Skeleton height={30} width="90%" />
                        <Skeleton height={30} width="80%" />
                    </div>

                    {/* Known For*/}
                    <div className={styles.info_right_section}>
                        <div className={styles.known_for_container}>
                            <Skeleton height={32} width="50%" />
                        </div>
                    </div>
                    <Skeleton height={32} width="20%" />
                    <Box sx={{ display: "flex", gap: "0.25rem" }}>
                        <Skeleton variant="circular" width={35} height={35} />
                        <Skeleton variant="circular" width={35} height={35} />
                        <Skeleton variant="circular" width={35} height={35} />
                    </Box>
                </div>
            </div>
        </>
    );
};

export default PersonInfoSkeleton;
