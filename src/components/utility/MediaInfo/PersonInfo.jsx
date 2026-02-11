import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/MediaInfo/PersonInfo.module.css";
import SocialsList from "../Socials/SocailsList";

const PersonInfo = (props) => {
    const { personData, socials } = props;

    return (
        <>
            <div className={styles.heading_container}>
                <h1>{personData.name}</h1>
                {!personData.name && <h1>{personData.original_name}</h1>}
            </div>
            <div className={styles.flex_info_container}>
                <div className={styles.info_left}>
                    <img
                        className={styles.img}
                        src={
                            personData.profile_path
                                ? `${BASE_IMAGE_URL}${personData.profile_path}`
                                : process.env.PUBLIC_URL + "/images/NO_IMAGE_FOUND.jpg"
                        }
                        alt={`${personData.name} profile`}
                    />
                </div>
                <div className={styles.info_right}>
                    {/* Known Aliases */}
                    {personData.also_known_as && personData.also_known_as.length > 0 && (
                        <div className={styles.info_right_section}>
                            <div className={styles.aliases}>
                                <h3>Also Known As:</h3>
                                <p>{personData.also_known_as.join(", ")}</p>
                            </div>
                        </div>
                    )}

                    {/*Birth Details*/}
                    <div className={styles.info_right_section}>
                        <div className={styles.details}>
                            <h3>Details:</h3>
                            <p>Born On: {personData.birthday ? personData.birthday : "Not Found"}</p>
                            {personData.deathday && <p>Died On: {personData.deathday}</p>}
                            <p>Place of Birth: {personData.place_of_birth ? personData.place_of_birth : "Not Found"}</p>
                        </div>
                    </div>

                    <div className={styles.info_right_section}>
                        {/*Biography */}
                        <h3>Biography:</h3>
                        <p id={styles.biography}>{personData.biography ? personData.biography : "None"}</p>
                    </div>

                    {/* Known For*/}
                    <div className={styles.info_right_section}>
                        {personData.known_for_department && (
                            <div className={styles.known_for_container}>
                                <h3>Known For:</h3>
                                <p>{personData.known_for_department}</p>
                            </div>
                        )}
                    </div>
                    <SocialsList socials={socials} />
                </div>
            </div>
        </>
    );
};

export default PersonInfo;
