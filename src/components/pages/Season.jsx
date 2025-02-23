import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL, BASE_IMAGE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";

import styles from "../../styles/pages/Season.module.css";

const Season = () => {
    const [seasonDetails, setSeasonDetails] = useState({});

    const { id } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/tv/${66732}/season/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response);
                setSeasonDetails(response);
            }
        );
    }, []);

    return (
        <>
            <h1 className={styles.title}>{seasonDetails.name}</h1>
            <img src={`${BASE_IMAGE_URL}${seasonDetails.poster_path}`} />
        </>
    );
};

export default Season;
