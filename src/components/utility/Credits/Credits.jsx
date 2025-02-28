import { useEffect, useState } from "react";
import styles from "../../../styles/utility/Credits/Credits.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import { BASE_IMAGE_URL } from "../../../constants/constants";

const Credits = (props) => {
    const { title, credits } = props;

    const [castCount, setCastCount] = useState(8);
    const [crewCount, setCrewCount] = useState(8);

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);

    const increaseCastCount = () => {
        setCastCount(castCount + 8);
    };

    const increaseCrewCount = () => {
        setCrewCount(crewCount + 8);
    };

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>{title}</h4>
            <h4>Cast</h4>
            <div className={styles.cast_container}>
                {credits?.cast
                    ?.filter((_, index) => index < castCount)
                    .map((cast) => (
                        <Card id={styles.cast_card}>
                            <CardMedia
                                id={styles.cast_profile}
                                image={`${BASE_IMAGE_URL}${cast?.profile_path}`}
                                title={cast?.name}
                            />{" "}
                            {/*Cast image import */}
                            <CardContent>
                                <h4>{cast?.name}</h4> {/*Cast name import */}
                                <h5>
                                    Roles:
                                    <span id={styles.cast_role}> {cast?.roles[0].character}</span>
                                </h5>
                                <p>{cast?.known_for_department}</p>
                            </CardContent>
                            <CardActions>
                                <a href={`/person/${cast?.id}`}>Learn More</a>
                            </CardActions>
                        </Card>
                    ))}
                <Card id={styles.cast_card} onClick={() => increaseCastCount()}>
                    <h4>View More</h4>
                </Card>
            </div>
            <h4>Crew</h4>
            <div className={styles.cast_container}>
                {credits?.crew
                    ?.filter((_, index) => index < crewCount)
                    .map((crew) => (
                        <Card id={styles.cast_card}>
                            <CardMedia
                                id={styles.cast_profile}
                                image={`${BASE_IMAGE_URL}${crew?.profile_path}`}
                                title={crew?.name}
                            />{" "}
                            {/*Cast image import */}
                            <CardContent>
                                <h4>{crew?.name}</h4> {/*Cast name import */}
                                <p>{crew?.known_for_department}</p>
                            </CardContent>
                            <CardActions>
                                <a href={`/person/${crew?.id}`}>Learn More</a>
                            </CardActions>
                        </Card>
                    ))}
                <Card id={styles.cast_card} onClick={() => increaseCrewCount()}>
                    <h4>View More</h4>
                </Card>
            </div>
        </>
    );
};

export default Credits;
