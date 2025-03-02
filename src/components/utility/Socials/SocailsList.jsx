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
                {!socials.facebook_id && <p>None</p>}
                {socials?.facebook_id && (
                    <a
                        href={`https://www.facebook.com/${socials.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FacebookIcon sx={{ fontSize: 30 }} />
                    </a>
                )}
                {socials?.facebook_id && (
                    <a
                        href={`https://www.instagram.com/${socials.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramIcon sx={{ fontSize: 30 }} />
                    </a>
                )}
                {socials?.twitter_id && (
                    <a href={`https://www.twitter.com/${socials.twitter_id}`} target="_blank" rel="noopener noreferrer">
                        <XIcon sx={{ fontSize: 30 }} />
                    </a>
                )}
                {socials?.tiktok_id && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="100%" height="100%">
                        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                    </svg>
                )}
                {socials?.youtube_id && (
                    <a href={`https://www.youtube.com/${socials.youtube_id}`} target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon sx={{ fontSize: 30 }} />
                    </a>
                )}
            </div>
        </>
    );
};

export default SocialsList;
