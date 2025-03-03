import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

import styles from "../../../styles/utility/Socials/SocialsList.module.css";

const SocialsList = (props) => {
    const { socials } = props;

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Socials:</h3>
                {!(socials.facebook_id || socials.instagram_id || socials.twitter_id || socials.youtube_id) && (
                    <p>None</p>
                )}
                <div className={styles.icon_container}>
                    {socials?.facebook_id && (
                        <a
                            href={`https://www.facebook.com/${socials.facebook_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon sx={{ fontSize: 30 }} />
                        </a>
                    )}
                    {socials?.instagram_id && (
                        <a
                            href={`https://www.instagram.com/${socials.instagram_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon sx={{ fontSize: 30 }} />
                        </a>
                    )}
                    {socials?.twitter_id && (
                        <a
                            href={`https://www.twitter.com/${socials.twitter_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <XIcon sx={{ fontSize: 30 }} />
                        </a>
                    )}
                    {socials?.youtube_id && (
                        <a
                            href={`https://www.youtube.com/${socials.youtube_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <YouTubeIcon sx={{ fontSize: 30 }} />
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};

export default SocialsList;
