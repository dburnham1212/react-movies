import { useState, useEffect } from "react";
// normally we would use a .env file to secure these values, for now i have put them into a file called constants
import {
    BASE_URL,
    ACTION_MOVIE_VAL,
    COMEDY_MOVIE_VAL,
    ADVENTURE_MOVIE_VAL,
    ANIMATION_TV_VAL,
    COMEDY_TV_VAL,
    SCI_FI_FANTASY_VAL,
} from "../../constants/constants";
// import functions from the helper files
import {
    makeApiCall,
    refineMovies,
    refinePeople,
    refineTVShows,
    refineSeasons,
    refineEpisodes,
} from "../../helper/helperFunctions";

// import stuff from MUI (Material UI)
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

import styles from "../../styles/pages/Browse.module.css";

import MediaImageRow from "../utility/ImageRows/MediaImageRow";

const Browse = () => {
    // This is an example of the useState hook, think of it like a declaration and a setter function
    // In this first example trendingMovies is the declaration and setTrendingMovies is the setter function
    // The variable will be set to anything inside the brackets in the useState hook
    // The trendingMovies variable would then be initialized to an empty array []
    const [mediaType, setMediaType] = useState("Movies");

    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [adventureMovies, setAdventureMovies] = useState([]);

    const [animationTvShows, setAnimationTVShows] = useState([]);
    const [comedyTVShows, setComedyTVShows] = useState([]);
    const [sciFiFantasyTvShows, setSciFiFantasyTVShows] = useState([]);

    const [trendingPeople, setTrendingPeople] = useState([]);

    const [strangerThingsSeasons, setStrangerThingsSeasons] = useState([]);

    const [strangerThingsOneEpisodes, setStrangerThingsOneEpisodes] = useState([]);

    useEffect(() => {
        // This is an example of the use effect hook!
        // We can use the use effect hook to create api calls
        // use effect will happen after the page renders for the first time

        // lets start by making a few API calls to TMDB
        makeApiCall(`${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== Movie Genre List =====");
            console.log(response.genres);
        });

        makeApiCall(`${BASE_URL}/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            console.log("===== TV Genre List =====");
            console.log(response.genres);
        });

        // Movie API Calls
        makeApiCall(
            `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${ACTION_MOVIE_VAL}`
        ).then((response) => setActionMovies(refineMovies(response.results)));

        makeApiCall(
            `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${COMEDY_MOVIE_VAL}`
        ).then((response) => setComedyMovies(refineMovies(response.results)));

        makeApiCall(
            `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${ADVENTURE_MOVIE_VAL}`
        ).then((response) => setAdventureMovies(refineMovies(response.results)));

        // TV API Calls
        makeApiCall(
            `${BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${ANIMATION_TV_VAL}`
        ).then((response) => setAnimationTVShows(refineTVShows(response.results)));

        makeApiCall(
            `${BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${COMEDY_TV_VAL}`
        ).then((response) => setComedyTVShows(refineTVShows(response.results)));

        makeApiCall(
            `${BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${SCI_FI_FANTASY_VAL}`
        ).then((response) => setSciFiFantasyTVShows(refineTVShows(response.results)));

        // People API Calls
        makeApiCall(`${BASE_URL}/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            setTrendingPeople(refinePeople(response.results));
        });

        // Season API Calls
        makeApiCall(`${BASE_URL}/tv/${66732}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            setStrangerThingsSeasons(refineSeasons(response.seasons));
        });

        // Episode API Calls
        makeApiCall(`${BASE_URL}/tv/${66732}/season/${1}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response.episodes);
            setStrangerThingsOneEpisodes(refineEpisodes(response.episodes));
        });
    }, []);

    const handleMediaTypeChange = (e) => {
        setMediaType(e.target.value);
    };

    return (
        <>
            <div className="wrapper">
                <h1 className={styles.title}>Browse</h1>

                <FormControl sx={{ marginLeft: 2.5, minWidth: 120 }}>
                    <InputLabel id="select-media-label">Media Type</InputLabel>
                    <Select
                        labelId="select-media-label"
                        id="select-media"
                        value={mediaType}
                        label="Media Type"
                        onChange={handleMediaTypeChange}
                    >
                        <MenuItem value={"Movies"}>Movies</MenuItem>
                        <MenuItem value={"TV"}>TV</MenuItem>
                        <MenuItem value={"People"}>People</MenuItem>
                        <MenuItem value={"Seasons"}>Seasons</MenuItem>
                        <MenuItem value={"Episodes"}>Episodes</MenuItem>
                    </Select>
                </FormControl>

                {mediaType === "Movies" && (
                    <>
                        {actionMovies.length && (
                            <MediaImageRow title={"Action Movies"} media={actionMovies} basePath={"/movie"} />
                        )}

                        {comedyMovies.length && (
                            <MediaImageRow title={"Comedy Movies"} media={comedyMovies} basePath={"/movie"} />
                        )}

                        {adventureMovies.length && (
                            <MediaImageRow title={"Adventure Movies"} media={adventureMovies} basePath={"/movie"} />
                        )}
                    </>
                )}
                {mediaType === "TV" && (
                    <>
                        {animationTvShows.length && (
                            <MediaImageRow title={"Animated TV"} media={animationTvShows} basePath={"/tv"} />
                        )}
                        {animationTvShows.length && (
                            <MediaImageRow title={"Comedy TV"} media={comedyTVShows} basePath={"/tv"} />
                        )}
                        {sciFiFantasyTvShows.length && (
                            <MediaImageRow
                                title={"Sci-Fi and Fantasy TV"}
                                media={sciFiFantasyTvShows}
                                basePath={"/tv"}
                            />
                        )}
                    </>
                )}
                {mediaType === "People" && (
                    <>
                        {trendingPeople.length && (
                            <MediaImageRow title={"Trending People"} media={trendingPeople} basePath={"/person"} />
                        )}
                    </>
                )}
                {mediaType === "Seasons" && (
                    <>
                        {strangerThingsSeasons.length && (
                            <MediaImageRow
                                title={"Stranger Things"}
                                media={strangerThingsSeasons}
                                basePath={"/season"}
                            />
                        )}
                    </>
                )}
                {mediaType === "Episodes" && (
                    <>
                        {strangerThingsOneEpisodes.length && (
                            <MediaImageRow
                                title={"Stranger Things One Episodes"}
                                media={strangerThingsOneEpisodes}
                                basePath={"/episode"}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Browse;
