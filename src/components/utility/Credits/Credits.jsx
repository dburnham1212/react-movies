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
    const { credits, title} = props;
    
    //cards
    const [Count, setCount] = useState(8);
    const [Expanded, setExpanded] = useState(true);
    
    //sort-by
    const [sortType, setSortType] = useState("default");  

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);
    
    //expand menu function
    const increaseCount = () => {   
        setExpanded();
        setCount(Count + 10000);
    };

    //sort-by function
    const handleSortCharge = (event) => {
        setSortType(event.target.value);
    };

    //sort-by handler
    const sorted = credits?.slice().sort((a, b) => {
        if (sortType === "a-z") return a.name.localeCompare(b.name);
        if (sortType === "z-a") return b.name.localeCompare(a.name);
        if (sortType === "popularity-desc") return b.popularity - a.popularity;
        if (sortType === "popularity-asc") return a.popularity - b.popularity;
        return 0;
    });

    return (
        <>
            <h4 className={`${styles.title} ${styles.underlined}`}>{title}</h4>    {/*Cast Title */}
            <div className={styles.card_container_O}>                           {/*Cast-Card Outer Container */}
                <div className = {styles.card_interact}>                        {/*Cast Interact Bar */}
                    <Box id = {styles.drop_down}>                               {/*Cast sort-by dropdown menu */}
                    <FormControl>
                        <InputLabel id = "sort-select-lebel">Sort</InputLabel>
                        <Select labelId = "sort-select-label" id = "sort-select" onChange = {handleSortCharge} value = {sortType} label = "Test">
                            <MenuItem value = "default">Default</MenuItem>
                            <MenuItem value = "a-z">A-Z</MenuItem>
                            <MenuItem value = "z-a">Z-A</MenuItem>
                            <MenuItem value = "popularity-desc">Popularity &#x25BC;</MenuItem>
                            <MenuItem value = "popularity-asc">Popularity &#x25B2;</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <Button id = {Expanded ? styles.card_button : styles.card_button_hidden} onClick={() => increaseCount()}>See All</Button>   {/*cast expand button */}
                </div>
                <div className = {Expanded ? styles.card_container_I : styles.card_container_I_B}>  {/*cast-card inner container */}
                    {sorted?.filter((_, index) => index < Count).map((cast) => (
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
                                    {title === "Cast" ? <h4>Role(s): <span id = {styles.small_text}>{cast?.roles[0].character}</span></h4> : 
                                    <h4>Job(s): <span id = {styles.small_text}>{cast?.jobs[0].job}</span></h4>}
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
        </>
    );
};

export default Credits;
