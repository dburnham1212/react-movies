import { useEffect } from "react";
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

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
        console.log(credits.cast.filter((item, index) => index < 4));
    }, []);

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>{title}</h4>
            <List className={styles.cast_container}>
                <ul>
                    <ListSubheader>Cast</ListSubheader>
                    <li>
                        {credits?.cast?.map((cast) => (
                            <Card id={styles.cast_card}>
                                <CardMedia
                                    id={styles.cast_profile}
                                    image={`${BASE_IMAGE_URL}${cast?.profile_path}`}
                                    title={cast?.name}
                                />{" "}
                                {/*Cast image import */}
                                <CardContent>
                                    <h4>{cast?.name}</h4> {/*Cast name import */}
                                    <p>{cast?.known_for_department}</p>
                                </CardContent>
                                <CardActions>
                                    <a href={`/person/${cast?.id}`}>Learn More</a>
                                </CardActions>
                            </Card>
                        ))}
                    </li>
                </ul>
            </List>
            <List className={styles.cast_container}>
                <ul>
                    <ListSubheader>Crew</ListSubheader>
                    <li>
                        {credits?.crew?.map((crew) => (
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
                    </li>
                </ul>
            </List>
        </>
    );
};

export default Credits;
