import { useEffect, useState } from "react";
import styles from "../../../styles/utility/Credits/Credits.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { BASE_IMAGE_URL } from "../../../constants/constants";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Credits = (props) => {
    const { credits } = props;
    
    //cast&crew cards
    const [castCount, setCastCount] = useState(8);
    const [crewCount, setCrewCount] = useState(8);

    const [crewExpanded, setCrewExpanded] = useState(true);
    const [castExpanded, setCastExpanded] = useState(true);
    
    //sort-by
    const [sortTypeCast, setSortTypeCast] = useState("default");
    const [sortTypeCrew, setSortTypeCrew] = useState("default");    

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);
    
    //expand cast menu function
    const increaseCastCount = () => {   
        setCastExpanded();
        setCastCount(castCount + 10000);
    };

    //expand crew menu function
    const increaseCrewCount = () => {   
        setCrewExpanded();
        setCrewCount(crewCount + 10000);    
    };

    //sort-by function
    const handleSortChargeCast = (event) => {
        setSortTypeCast(event.target.value);
    };

    const handleSortChargeCrew = (event) => {
        setSortTypeCrew(event.target.value);
    };

    //sort-cast-by handler
    const sortedCast = credits?.cast?.slice().sort((a, b) => {
        if (sortTypeCast === "a-z") return a.name.localeCompare(b.name);
        if (sortTypeCast === "z-a") return b.name.localeCompare(a.name);
        if (sortTypeCast === "popularity-desc") return b.popularity - a.popularity;
        if (sortTypeCast === "popularity-asc") return a.popularity - b.popularity;
        return 0;
    });

    //sort-crew-by handler
    const sortedCrew = credits?.crew?.slice().sort((a, b) => {
        if (sortTypeCrew === "a-z") return a.name.localeCompare(b.name);
        if (sortTypeCrew === "z-a") return b.name.localeCompare(a.name);
        if (sortTypeCrew === "popularity-desc") return b.popularity - a.popularity;
        if (sortTypeCrew === "popularity-asc") return a.popularity - b.popularity;
        return 0;
    });

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>Cast</h4>    {/*Cast Title */}
            <div className={styles.card_container_O}>                           {/*Cast-Card Outer Container */}
                <div className = {styles.card_interact}>                        {/*Cast Interact Bar */}
                    <Box id = {styles.drop_down}>                               {/*Cast sort-by dropdown menu */}
                    <FormControl>
                        <InputLabel id = "sort-select-lebel">Sort</InputLabel>
                        <Select labelId = "sort-select-label" id = "sort-select" onChange = {handleSortChargeCast} value = {sortTypeCast} label = "Test">
                            <MenuItem value = "default">Default</MenuItem>
                            <MenuItem value = "a-z">A-Z</MenuItem>
                            <MenuItem value = "z-a">Z-A</MenuItem>
                            <MenuItem value = "popularity-desc">Popularity &#x25BC;</MenuItem>
                            <MenuItem value = "popularity-asc">Popularity &#x25B2;</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <Button id = {castExpanded ? styles.card_button : styles.card_button_hidden} onClick={() => increaseCastCount()}>See All</Button>   {/*cast expand button */}
                </div>
                <div className = {castExpanded ? styles.card_container_I : styles.card_container_I_B}>  {/*cast-card inner container */}
                    {sortedCast?.filter((_, index) => index < castCount).map((cast) => (
                        <Card id = {styles.card} key = {cast?.id}>                                      {/*cast-card */}
                            <div className = {styles.card_hidden}>                                      {/*cast-card additional info */}
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
                            {/*cast profile-img */}
                            <CardMedia                                                                  
                                id={styles.card_profile}
                                image={`${BASE_IMAGE_URL}${cast?.profile_path}`}
                                title={cast?.name}
                            />
                            <h4 id = {styles.card_name}>{cast?.name}</h4> {/*Cast name display*/}
                        </Card>
                    ))}
                </div>
                
            </div>
            <h4 className={`${styles.title} ${styles.underlined}`}>Crew</h4>    {/*crew title */}
            <div className={styles.card_container_O}>                           {/*crew-card outer container */}
                <div className = {styles.card_interact}>                        {/*crew interact bar */}
                    <Box id = {styles.drop_down}>                               {/*crew sort-by dropdown menu */}
                    <FormControl>
                        <InputLabel id = "sort-select-lebel">Sort</InputLabel>
                        <Select labelId = "sort-select-label" id = "sort-select" onChange = {handleSortChargeCrew} value = {sortTypeCrew} label = "Test">
                            <MenuItem value = "default">Default</MenuItem>
                            <MenuItem value = "a-z">A-Z</MenuItem>
                            <MenuItem value = "z-a">Z-A</MenuItem>
                            <MenuItem value = "popularity-desc">Popularity &#x25BC;</MenuItem>
                            <MenuItem value = "popularity-asc">Popularity &#x25B2;</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <Button id = {crewExpanded ? styles.card_button : styles.card_button_hidden} onClick={() => increaseCrewCount()}>See All</Button>   {/*crew expand button */}
                </div>
                <div className = {crewExpanded ? styles.card_container_I : styles.card_container_I_B}>              {/*crew-card inner container */}
                    {sortedCrew?.filter((_, index) => index < crewCount)
                    .map((crew) => (
                        <Card id = {styles.card}>                                                                   {/*crew-card */}
                            <div className = {styles.card_hidden}>                                                  {/*crew-card additional info */}
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
                            {/*crew profile-img */}
                            <CardMedia
                                id={styles.card_profile}
                                image={`${BASE_IMAGE_URL}${crew?.profile_path}`}
                                title={crew?.name}
                            />
                            <h4 id = {styles.card_name}>{crew?.name}</h4> {/*Crew name display*/}
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Credits;
