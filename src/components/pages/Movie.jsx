import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { API_KEY, BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Movie.module.css";

const Movie = () => {
    const [movieData, setMovieData] = useState({});

    const { id } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then((response) => {
            console.log(response);
            setMovieData(response);
        });
    }, []);

    return (
        <>
            <h1 className={styles.title}>{movieData.title}</h1>
            <img src={`${BASE_IMAGE_URL}${movieData.poster_path}`} />
        </>
    );
};

export default Movie;
