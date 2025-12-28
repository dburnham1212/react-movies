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
import { FormControl, Select, MenuItem, InputLabel, Stack, Pagination } from "@mui/material";

import styles from "../../styles/pages/Browse.module.css";

import MediaImageRow from "../utility/ImageRows/MediaImageRow";
import MediaCard from "../utility/Cards/MediaCard";

const Browse = () => {
    // This is an example of the useState hook, think of it like a declaration and a setter function
    // In this first example trendingMovies is the declaration and setTrendingMovies is the setter function
    // The variable will be set to anything inside the brackets in the useState hook
    // The trendingMovies variable would then be initialized to an empty array []
    const [mediaType, setMediaType] = useState("Movies");

    // Movie genre states
    const [movieGenres, setMovieGenres] = useState([]);
    const [movieGenre, setMovieGenre] = useState({});

    // Movie Info
    const [selectedGenreMovies, setSelectedGenreMovies] = useState({});

    // TV genre states
    const [tvGenres, setTvGenres] = useState([]);
    const [tvGenre, setTvGenre] = useState({});

    // Movie Info
    const [selectedGenreTv, setSelectedGenreTv] = useState({});

    const [currentPage, setCurrentPage] = useState(1);

    const [trendingPeople, setTrendingPeople] = useState([]);

    const getMoviesForGenre = (genreId, currentPage) => {
        makeApiCall(
            `${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genreId}&page=${currentPage}`
        ).then((response) => {
            console.log(response);
            setSelectedGenreMovies(response);
        });
    };

    const getTvForGenre = (genreId, currentPage) => {
        makeApiCall(
            `${BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genreId}&page=${currentPage}`
        ).then((response) => {
            console.log(response);
            setSelectedGenreTv(response);
        });
    };

    const getPeopleByPage = (currentPage) => {
        makeApiCall(
            `${BASE_URL}/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
        ).then((response) => {
            console.log(response);
            setTrendingPeople(response);
        });
    };

    useEffect(() => {
        // This is an example of the use effect hook!
        // We can use the use effect hook to create api calls
        // use effect will happen after the page renders for the first time

        // lets start by making a few API calls to TMDB
        makeApiCall(`${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== Movie Genre List =====");
            console.log(response.genres);
            setMovieGenres(response.genres);
            setMovieGenre(response.genres[0]);
            getMoviesForGenre(response.genres[0].id, currentPage);
        });

        makeApiCall(`${BASE_URL}/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== TV Genre List =====");
            console.log(response);
            setTvGenres(response.genres);
            setTvGenre(response.genres[0]);
            getTvForGenre(response.genres[0].id, currentPage);
        });

        // People API Calls
        makeApiCall(`${BASE_URL}/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== Trending People =====");
            console.log(response);
            setTrendingPeople(response);
        });
    }, []);

    const handleMediaTypeChange = (e) => {
        setMediaType(e.target.value);
        if (e.target.value === "Movies") {
            // reset the movie search to the first selection
            setMovieGenre(movieGenres[0]);
            getMoviesForGenre(movieGenres[0].id, 1);
        } else if (e.target.value === "TV") {
            // reset the tv search to the first selection
            setTvGenre(tvGenres[0]);
            getTvForGenre(tvGenres[0].id, 1);
        } else if (e.target.value === "People") {
            getPeopleByPage(1);
        }
        setCurrentPage(1);
    };

    const handleMovieGenreChange = (e) => {
        setMovieGenre(movieGenres.find((genre) => e.target.value === genre.id));
        setCurrentPage(1);
        getMoviesForGenre(e.target.value, 1);
    };

    const handleTvGenreChange = (e) => {
        setTvGenre(tvGenres.find((genre) => e.target.value === genre.id));
        setCurrentPage(1);
        getTvForGenre(e.target.value, 1);
    };

    const handleMoviePageChange = (e, value) => {
        setCurrentPage(value);
        getMoviesForGenre(movieGenre.id, value);
    };

    const handleTvPageChange = (e, value) => {
        setCurrentPage(value);
        getTvForGenre(tvGenre.id, value);
    };

    const handlePeoplePageChange = (e, value) => {
        setCurrentPage(value);
        getPeopleByPage(value);
    };

    return (
        <>
            <div className="wrapper">
                <div className={styles.page_container}>
                    <FormControl sx={{ marginRight: 2.5, minWidth: "25%" }}>
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
                        </Select>
                    </FormControl>
                    {/* Movies browse info */}
                    {movieGenres?.length && mediaType === "Movies" && (
                        <FormControl sx={{ minWidth: "25%" }}>
                            <InputLabel id="select-media-label">Genre</InputLabel>
                            <Select
                                labelId="select-media-label"
                                id="select-media"
                                value={movieGenre.id}
                                label="Genre"
                                onChange={handleMovieGenreChange}
                            >
                                {movieGenres.map((genre, index) => (
                                    <MenuItem key={index} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {mediaType === "Movies" && (
                        <>
                            <div className={styles.card_container}>
                                {/* Get Movies By Selected Genre*/}
                                {selectedGenreMovies?.results?.length &&
                                    selectedGenreMovies?.results?.map((movie, index) => {
                                        return (
                                            <MediaCard
                                                key={index}
                                                media={movie}
                                                displayType={false}
                                                mediaType={"movie"}
                                            />
                                        );
                                    })}
                            </div>
                            <div className={styles.pagination_box}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={
                                            selectedGenreMovies.total_pages > 500
                                                ? 500
                                                : selectedGenreMovies.total_pages
                                        }
                                        page={currentPage}
                                        onChange={handleMoviePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                        </>
                    )}
                    {/* TV browse info */}
                    {tvGenres?.length && mediaType === "TV" && (
                        <FormControl sx={{ minWidth: "25%" }}>
                            <InputLabel id="select-media-label">Genre</InputLabel>
                            <Select
                                labelId="select-media-label"
                                id="select-media"
                                value={tvGenre.id}
                                label="Genre"
                                onChange={handleTvGenreChange}
                            >
                                {tvGenres.map((genre, index) => (
                                    <MenuItem key={index} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {mediaType === "TV" && (
                        <>
                            <div className={styles.card_container}>
                                {/* Get Movies By Selected Genre*/}
                                {selectedGenreTv?.results?.length &&
                                    selectedGenreTv?.results?.map((show, index) => {
                                        return (
                                            <MediaCard key={index} media={show} displayType={false} mediaType={"tv"} />
                                        );
                                    })}
                            </div>
                            <div className={styles.pagination_box}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={selectedGenreTv.total_pages > 500 ? 500 : selectedGenreTv.total_pages}
                                        page={currentPage}
                                        onChange={handleTvPageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                        </>
                    )}
                    {mediaType === "People" && (
                        <>
                            <div className={styles.card_container}>
                                {/* Get Trending People*/}
                                {trendingPeople?.results?.length &&
                                    trendingPeople?.results?.map((person, index) => {
                                        return (
                                            <MediaCard
                                                key={index}
                                                media={person}
                                                displayType={true}
                                                mediaType={"person"}
                                            />
                                        );
                                    })}
                            </div>
                            <div className={styles.pagination_box}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={trendingPeople.total_pages > 500 ? 500 : trendingPeople.total_pages}
                                        page={currentPage}
                                        onChange={handlePeoplePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                            {/* {trendingPeople.length && (
                                <MediaImageRow title={"Trending People"} media={trendingPeople} basePath={"/person"} />
                            )} */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Browse;
