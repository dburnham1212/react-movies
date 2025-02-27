import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Movie.module.css";

const Movie = () => {
    // Jason Pilla the lady killa, with the power of ten gorillas
    const [movieData, setMovieData] = useState({});

    const { id } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieData(response);
        });
    }, [id]);
    
    let ratingIndex = []

    for (let index = 0; index < Math.round(movieData.vote_average / 2); index++)
        ratingIndex.push(1 + index);

    // how to backgroundImages using paths from objects
    // <div className={styles.background} style={{backgroundImage: `url(${BASE_IMAGE_URL}${movieData.backdrop_path})`}}>

    return (
        <>
            {Object.keys(movieData).length > 0 && (
                <>
                    <img
                        align={"left"}
                        src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                        alt={`${movieData.title} poster`} width={"360"}
                    />
                    <h1>{movieData.title}</h1>
                    {movieData.original_title !== movieData.title &&
                        <h3>{movieData.original_title}</h3>}
                    {movieData.tagline &&
                        <p><i>{movieData.tagline}</i></p>}
                        <p>{movieData.overview}</p>
                    {movieData.adult &&
                        <p>Adults Only</p>}
                    {movieData.genres.length === 1 ?
                        <h4>Genre:</h4> : <h4>Genres:</h4>}
                    <div className={styles.genre_container}>
                        {movieData.genres.map((genre, index) => {
                            let comma = "";

                            if (index)
                                comma = ", ";

                            return <p key={index}>{comma}{genre.name}</p>
                        })}
                    </div>
                    <div className={styles.rating_container}>
                        {ratingIndex.map((value) => {
                            return <h3 key ={value}>&#x2605;</h3>
                        })}
                    </div>
                    {movieData.homepage &&
                        <p><i>Website: <a href={movieData.homepage}>{movieData.homepage}</a></i></p>}
                </>
            )}
        </>
    );
};

export default Movie;
