import { useEffect, useState } from "react";
import styles from "../../../styles/utility/Credits/Credits.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { BASE_IMAGE_URL } from "../../../constants/constants";

const Credits = (props) => {
    const { credits } = props;

    const [castCount, setCastCount] = useState(8);
    const [crewCount, setCrewCount] = useState(8);

    const [crewExpanded, setCrewExpanded] = useState(true);
    const [castExpanded, setCastExpanded] = useState(true);

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);

    const increaseCastCount = () => {   //displays all cast function
        setCastExpanded();
        setCastCount(castCount + 10000);
    };

    const increaseCrewCount = () => {   //displays all crew function
        setCrewExpanded();
        setCrewCount(crewCount + 10000);    
    };

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>Cast</h4>
            <div className={styles.card_container_O}>
                <div className = {castExpanded ? styles.card_container_I : styles.card_container_I_B}>
                    {credits?.cast
                    ?.filter((_, index) => index < castCount)
                    .map((cast) => (
                        <Card id = {styles.card}>
                            <div className = {styles.card_hidden}>
                                <CardContent id = {styles.card_content}>
                                    {(cast?.name !== cast?.original_name ? 
                                        <h4>
                                            Name: {" "}
                                            <span id = {styles.small_text}>
                                                {cast?.name} / {cast?.original_name}
                                            </span>
                                        </h4> : 
                                        <h4>
                                            Name: {" "}
                                            <span id = {styles.small_text}>
                                                {cast?.name}
                                            </span>
                                        </h4>
                                    )} 
                                    <h4>Popularity: <span id = {styles.small_text}>{cast?.popularity.toFixed(1)}</span></h4>
                                    <h4>Department: <span id = {styles.small_text}>{cast?.known_for_department}</span></h4>
                                    <h4>Role(s): <span id = {styles.small_text}>{cast?.roles[0].character}</span></h4>
                                </CardContent>
                                <a id = {styles.card_link} href={`/person/${cast?.id}`}>Learn More</a>
                            </div>
                            <CardMedia
                                id={styles.card_profile}
                                image={`${BASE_IMAGE_URL}${cast?.profile_path}`}
                                title={cast?.name}
                            />
                            <h4 id = {styles.card_name}>{cast?.name}</h4> {/*Cast name import */}
                        </Card>
                    ))}
                </div>
                <Button id = {castExpanded ? styles.card_button : styles.card_button_hidden} onClick={() => increaseCastCount()}>See All</Button>
            </div>
            <h4 className={`${styles.title} ${styles.underlined}`}>Crew</h4>
            <div className={styles.card_container_O}>
                <div className = {crewExpanded ? styles.card_container_I : styles.card_container_I_B}>
                    {credits?.crew
                    ?.filter((_, index) => index < crewCount)
                    .map((crew) => (
                        <Card id = {styles.card}>
                            <div className = {styles.card_hidden}>
                                <CardContent id = {styles.card_content}>
                                    {(crew?.name !== crew?.original_name ? 
                                        <h4>
                                            Name: {" "}
                                            <span id = {styles.small_text}>
                                                {crew?.name} / {crew?.original_name}
                                            </span>
                                        </h4> : 
                                        <h4>
                                            Name: {" "}
                                            <span id = {styles.small_text}>
                                                {crew?.name}
                                            </span>
                                        </h4>
                                    )}
                                    <h4>Popularity: <span id = {styles.small_text}>{crew?.popularity.toFixed(1)}</span></h4>
                                    <h4>Department: <span id = {styles.small_text}>{crew?.known_for_department}</span></h4>
                                    <h4>Job: <span id = {styles.small_text}>{crew?.jobs[0].job}</span></h4>
                                </CardContent>
                                <a id = {styles.card_link} href={`/person/${crew?.id}`}>Learn More</a>
                            </div>
                            <CardMedia
                                id={styles.card_profile}
                                image={`${BASE_IMAGE_URL}${crew?.profile_path}`}
                                title={crew?.name}
                            />
                            <h4 id = {styles.card_name}>{crew?.name}</h4> {/*Cast name import */}
                        </Card>
                    ))}
                </div>
                <Button id = {crewExpanded ? styles.card_button : styles.card_button_hidden } onClick={() => increaseCrewCount()}>See All</Button>
            </div>
        </>
    );
};

export default Credits;
