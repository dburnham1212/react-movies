import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/TVShow.module.css";
import { Rating } from "@mui/material";
import Credits from "../utility/Credits/Credits";

const TVShow = () => {
    const [tvShowData, setTvShowData] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [tvShowAggCredits, setTvShowAggCredits] = useState({});
    const [tvShowImages, setTvShowImages] = useState({});
    const [tvShowVideos, setTvShowVideos] = useState([]);

    const { id } = useParams();

    //Function to get api data from db
    useEffect(() => {
        makeApiCall(`${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setTvShowData(response);
        });

        // Credits
        makeApiCall(`${BASE_URL}/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("==== Credits ====");
            console.log(response);
            setTvShowCredits(response);
        });

        // Aggregate Credits
        makeApiCall(`${BASE_URL}/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log("==== Aggregate Credits ====");
                console.log(response);
                setTvShowAggCredits(response);
            }
        );

        //api.themoviedb.org/3/tv/{series_id}/images
        // Videos
        makeApiCall(`${BASE_URL}/tv/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("==== Images ====");
            console.log(response);
            setTvShowImages(response);
        });

        // Videos
        makeApiCall(`${BASE_URL}/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("==== Videos ====");
            console.log(response.results);
            setTvShowVideos(response.results);
        });
    }, []);

    //Code html here
    return (
        <>
            <div className={styles.flex_info_container}>
                {" "}
                {/*Flexbox info container*/}
                <div className={styles.info_left}>
                    {" "}
                    {/*Flexbox info left*/}
                    <img
                        src={`${BASE_IMAGE_URL}${tvShowData.poster_path}`}
                        alt={`${tvShowData.title} poster`}
                        width={"360"}
                    />
                </div>
                <div className={styles.info_right}>
                    {" "}
                    {/*Flexbox info right*/}
                    <h1>{tvShowData.name}</h1> {/*Title*/}
                    {/*if show doesn't have a title in local language, display original title*/}
                    {!tvShowData.name && <h1>{tvShowData.original_name}</h1>}
                    {/*if show has a tagline, display tagline*/}
                    {tvShowData.tagline && <p id={styles.tagline}>{tvShowData.tagline}</p>}
                    <p id={styles.overview}>{tvShowData.overview}</p> {/*info paragraph */}
                    {tvShowData.adult && <p id={styles.adult_warning}>Adults Only 18+</p>} {/*R warning */}
                    <h3>Genres:</h3> {/*genre display */}
                    <div className={styles.genre_container}>
                        {tvShowData?.genres?.map((genre, index) => {
                            let comma = "";
                            if (index) comma = ", ";
                            return (
                                <p key={index}>
                                    {comma}
                                    {genre.name}
                                </p>
                            );
                        })}
                    </div>
                    {/*Ratings mui here*/}
                    <div className={styles.rating_container}>
                        <Rating value={tvShowData.vote_average / 2} precision={0.1} readOnly />
                        <p>Average Score: {Number(tvShowData.vote_average / 2).toFixed(1)}/5</p>
                        <p id={styles.num_votes}>Votes: {tvShowData.vote_count}</p>
                    </div>
                    {/*show homepage link if available */}
                    {tvShowData.homepage && (
                        <p id={styles.homepage_link}>
                            Website: <a href={tvShowData.homepage}>{tvShowData.homepage}</a>
                        </p>
                    )}
                </div>
            </div>
            {Object.keys(tvShowImages).length && <img src={`${BASE_IMAGE_URL}${tvShowImages.posters[2].file_path}`} />}
            {Object.keys(tvShowCredits).length && <Credits credits={tvShowCredits} />}
            {/*carousel(s) go here */}
        </>
    );
};

export default TVShow;
