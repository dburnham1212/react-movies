import { useEffect } from "react";
import styles from "../../../styles/utility/Credits/Credits.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const Credits = (props) => {
    const { credits } = props;

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);

    return (
        <>
            <h1>This is the credits component</h1>
            <div className = {styles.cast_container}>
                {credits?.cast?.map((cast) => 
                    (<Card sx = {{maxWidth:345}}>
                    <CardMedia/>    {/*Cast image import */}
                    <CardContent>
                        <h4>{cast?.name}</h4>   {/*Cast name import */}
                        <h5>{cast?.known_for_department}</h5>
                        <p></p>     {/*Cast blurb import */}
                    </CardContent>
                    <CardActions>
                        <Button size = "small">Learn More</Button>
                    </CardActions>
                    </Card>)
                )}
            </div>
        </>
    );
};

export default Credits;
