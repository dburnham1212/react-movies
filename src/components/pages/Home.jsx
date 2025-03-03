import { useState, useEffect } from "react";
// normally we would use a .env file to secure these values, for now i have put them into a file called constants
import { BASE_URL } from "../../constants/constants";
// import functions from the helper files
import { makeApiCall } from "../../helper/helperFunctions";

import styles from "../../styles/pages/Home.module.css";

import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";

import MainCarousel from "../utility/Carousels/MainCarousel";
import MediaCard from "../utility/Cards/MediaCard";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";

const Home = () => {
    const [trending, setTrending] = useState([]);

    // movie states
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    // tv states
    const [airingTodayTV, setAiringTodayTV] = useState([]);
    const [onTheAirTV, setOnTheAirTV] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [topRatedTv, setTopRatedTV] = useState([]);

    useEffect(() => {
        makeApiCall(`${BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setTrending(response.results)
        );

        makeApiCall(`${BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setNowPlayingMovies(response.results)
        );

        makeApiCall(`${BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setPopularMovies(response.results)
        );

        makeApiCall(`${BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setTopRatedMovies(response.results)
        );

        makeApiCall(`${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setUpcomingMovies(response.results)
        );

        makeApiCall(`${BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setAiringTodayTV(response.results)
        );

        makeApiCall(`${BASE_URL}/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setOnTheAirTV(response.results)
        );

        makeApiCall(`${BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setPopularTV(response.results)
        );

        makeApiCall(`${BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setTopRatedTV(response.results)
        );
    }, []);

    return (
        <>
            <div className="wrapper">
                <div style={{ maxHeight: "650px", width: "100%", height: "650px" }}>
                    {trending.length && <MainCarousel mediaData={trending} />}
                </div>
                <div className={styles.large_heading_container}>
                    <LocalMoviesIcon className={styles.icon} />
                    <h1 className={styles.large_heading}>Movies</h1>
                    <LocalMoviesIcon className={styles.icon} />
                </div>
                {/* Now Playing Movies */}
                <MediaCardRow media={nowPlayingMovies} title="Now Playing" mediaType="movie" size="L" />
                {/* Top Rated Movies */}
                <MediaCardRow media={topRatedMovies} title="Top Rated" mediaType="movie" size="N" />
                {/* Top Rated Movies */}
                <MediaCardRow media={popularMovies} title="Popular" mediaType="movie" size="N" />
                {/* Upcoming Movies */}
                <MediaCardRow media={upcomingMovies} title="Upcoming" mediaType="movie" size="N" />

                <div className={styles.large_heading_container}>
                    <TvIcon className={styles.icon} />
                    <h1 className={styles.large_heading}>TV</h1>
                    <TvIcon className={styles.icon} />
                </div>

                {/* Airing Today TV */}
                <MediaCardRow media={airingTodayTV} title="Airing Today" mediaType="tv" size="L" />
                {/* Top Rated TV */}
                <MediaCardRow media={topRatedTv} title="Top Rated" mediaType="tv" size="N" />
                {/* On The Air TV */}
                <MediaCardRow media={onTheAirTV} title="On The Air" mediaType="tv" size="N" />
                {/* On The Air TV */}
                <MediaCardRow media={popularTV} title="Popular" mediaType="tv" size="N" />
            </div>
        </>
    );
};

export default Home;
