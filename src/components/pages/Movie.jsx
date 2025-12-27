import { useState, useEffect, useContext } from "react";
import { makeApiCall, makeDeleteApiCall, makePostApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import { Button, IconButton, Rating, Tooltip } from "@mui/material";

// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavoriteOutlined } from "@mui/icons-material";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TvIcon from "@mui/icons-material/Tv";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Style sheet
import styles from "../../styles/pages/Movie.module.css";

// Component Imports
import Credits from "../utility/Credits/Credits";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";
import RatingModal from "../utility/Modals/RatingModal";
import YouTube from "react-youtube";

// Context providers
import { userContext } from "../context/UserContext";
import AlertMessage from "../utility/Alerts/AlertMessage";

import { combineCrewCredits } from "../../helper/helperFunctions";

const Movie = () => {
    // ----- Static states -----
    const [movieData, setMovieData] = useState({});
    const [movieImages, setMovieImages] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieCredits, setMovieCredits] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [watchProviders, setWatchProviders] = useState({});

    // ----- Dynamic states -----
    // Account states if a user is logged in
    const [accountStates, setAccountStates] = useState({});
    const [accountStateChangeAlert, setAccountStateChangeAlert] = useState("");

    // Gallery modal states
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    // Video modal states
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    // Rating modal states
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    // Context providers
    const { isAuthenticated, accountId, getSessionId } = useContext(userContext);

    // Params from url
    const { id } = useParams();

    useEffect(() => {
        // check if the user is authenticated or not
        if (isAuthenticated()) {
            // if so get their current account states for the selected movie
            makeApiCall(
                `${BASE_URL}/movie/${id}/account_states?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`
            ).then((response) => {
                // set account states based on response
                setAccountStates(response);
                // update the rating value locally to be the same as the one that is saved
                if (response.rated) setRatingValue((response.rated.value / 2).toFixed(1));
            });
        }

        // Get the base data for the movie and set update movieData state to match
        makeApiCall(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieData(response);
        });

        // Get the movie image data and update movieImage state to match
        makeApiCall(`${BASE_URL}/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieImages(response);
        });

        // Get the videos specifically tagged as YouTube and update movieVideos state to match
        makeApiCall(`${BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response.results);
            setMovieVideos(response.results.filter((video) => video.site === "YouTube"));
        });

        // Get the movies credits and update movieCredits state to match
        makeApiCall(`${BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieCredits(response);
        });

        // Get the similar movies and update similarMovies state to match
        makeApiCall(`${BASE_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response.results);
            setSimilarMovies(response.results);
        });

        // Get the recommended movies and update recommendedMovies state to match
        makeApiCall(`${BASE_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response.results);
                setRecommendedMovies(response.results);
            }
        );

        // Get the watch providers and update watchProviders state to match
        makeApiCall(`${BASE_URL}/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response);
                setWatchProviders(response.results);
            }
        );

        // Get the reviews and update reviews state to match
        makeApiCall(`${BASE_URL}/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setReviews(response);
        });
    }, [id]);

    // function to toggle the movies as a favourite
    const toggleFavourite = () => {
        if (accountStates.favorite) {
            // update local state
            setAccountStates({ ...accountStates, favorite: false });
            // update on server
            makePostApiCall(
                `${BASE_URL}/account/${accountId}/favorite?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`,
                { media_type: "movie", media_id: id, favorite: false }
            );
            // Show appropriate alert message
            setAccountStateChangeAlert("Removed from favourites");
        } else {
            // update local state
            setAccountStates({ ...accountStates, favorite: true });
            // update on server
            makePostApiCall(
                `${BASE_URL}/account/${accountId}/favorite?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`,
                { media_type: "movie", media_id: id, favorite: true }
            );
            // Show appropriate alert message
            setAccountStateChangeAlert("Added to favourites");
        }
    };

    // function to toggle the movies as a part of watchlist
    const toggleWatchlist = () => {
        if (accountStates.watchlist) {
            // update local state
            setAccountStates({ ...accountStates, watchlist: false });
            // update on server
            makePostApiCall(
                `${BASE_URL}/account/${accountId}/watchlist?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`,
                { media_type: "movie", media_id: id, watchlist: false }
            );
            // Show appropriate alert message
            setAccountStateChangeAlert("Removed from watchlist");
        } else {
            // update local state
            setAccountStates({ ...accountStates, watchlist: true });
            // update on server
            makePostApiCall(
                `${BASE_URL}/account/${accountId}/watchlist?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`,
                { media_type: "movie", media_id: id, watchlist: true }
            );
            // Show appropriate alert message
            setAccountStateChangeAlert("Added to watchlist");
        }
    };

    // open the rating modal
    const openRatingModal = () => {
        setRatingModalOpen(true);
    };

    // close the rating modal
    const closeRatingModal = () => {
        setRatingModalOpen(false);
    };

    // function to save the users rating
    const saveRating = () => {
        // send the rating to the db
        makePostApiCall(
            `${BASE_URL}/movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`,
            { value: ratingValue * 2 }
        );
        // update locally
        setAccountStates({ ...accountStates, rated: { value: ratingValue * 2 } });
        // close modal
        closeRatingModal();
        // Show appropriate alert message
        setAccountStateChangeAlert("Rating saved");
    };

    const deleteRating = () => {
        // delete rating from db
        makeDeleteApiCall(
            `${BASE_URL}/movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`
        );
        // update locally
        setAccountStates({ ...accountStates, rated: false });
        setRatingValue(2.5);
        // close modal
        closeRatingModal();
        // Show appropriate alert message
        setAccountStateChangeAlert("Rating deleted");
    };

    // Open the gallery modal and set the index to the specified index
    const openArtworkModalWithIndex = (index) => {
        setOpenArtworkModal(true);
        setArtworkModalIndex(index);
    };

    // Close the gallery modal
    const closeArtworkModal = () => {
        setOpenArtworkModal(false);
    };

    // Open the video modal and set the index to the specified index
    const openVideoModalWithIndex = (index) => {
        setOpenVideoModal(true);
        setVideoModalIndex(index);
    };

    // close the video modal
    const closeVideoModal = () => {
        setOpenVideoModal(false);
    };

    return (
        <>
            <div className="wrapper">
                <div className={styles.heading_container}>
                    <div className={styles.heading}>
                        <h1>{movieData.title}</h1>
                        {movieData.original_title !== movieData.title && <h3>{movieData.original_title}</h3>}
                    </div>
                    <div className={styles.movie_ratings}>
                        {/* Overall movie rating */}
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>{Number(movieData.vote_average / 2).toFixed(1)}</span>/5
                                </p>
                            </div>
                            <p id={styles.num_votes}>Votes: {movieData.vote_count}</p>
                        </div>
                        {/* Personal rating if user has logged in */}
                        {isAuthenticated() && (
                            <div className={styles.rating_container}>
                                <h5>My Rating</h5>
                                <div className={styles.star_rating}>
                                    <StarIcon color="warning" />
                                    {accountStates?.rated?.value ? (
                                        <p>
                                            <span>{Number(accountStates.rated.value / 2).toFixed(1)}</span>/5
                                        </p>
                                    ) : (
                                        <p>N/A</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.content_left}>
                        <img
                            src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                            alt={`${movieData.title} poster`}
                            width={"360"}
                        />
                    </div>
                    <div className={styles.content_right}>
                        <div id={styles.right_upper_content}>
                            {movieData.tagline && <p id={styles.tagline}>{movieData.tagline}</p>}
                            <p id={styles.overview}>{movieData.overview}</p>
                            {/* Genres */}
                            {movieData?.genres?.length === 1 ? <h3>Genre:</h3> : <h3>Genres:</h3>}
                            <div className={styles.genre_container}>
                                <p id={styles.genres}>{movieData?.genres?.map((genre) => genre.name).join(", ")}</p>
                            </div>
                            {movieData.adult && <p>Adults Only</p>}
                        </div>
                        {/* Buttons for favourite, watchlist and rating */}
                        {isAuthenticated() && (
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <Tooltip title={accountStates.favorite ? "Remove favourite" : "Add to favourites"}>
                                    <IconButton
                                        sx={{ backgroundColor: "#555555" }}
                                        size="large"
                                        color="warning"
                                        onClick={toggleFavourite}
                                    >
                                        {accountStates.favorite ? <FavoriteOutlined /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title={accountStates.watchlist ? "Remove from watch list" : "Add to watch list"}
                                >
                                    <IconButton
                                        sx={{ backgroundColor: "#555555" }}
                                        size="large"
                                        color="warning"
                                        onClick={toggleWatchlist}
                                    >
                                        {accountStates.watchlist ? <DesktopWindowsIcon /> : <TvIcon />}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Update rating">
                                    <IconButton
                                        sx={{ backgroundColor: "#555555" }}
                                        size="large"
                                        color="warning"
                                        onClick={openRatingModal}
                                    >
                                        {accountStates?.rated?.value ? <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>
                                </Tooltip>
                                <AlertMessage controlState={accountStates} alertMessage={accountStateChangeAlert} />
                                <RatingModal
                                    open={ratingModalOpen}
                                    handleClose={closeRatingModal}
                                    title={movieData.title}
                                    ratingValue={ratingValue}
                                    setRatingValue={setRatingValue}
                                    deleteRating={deleteRating}
                                    saveRating={saveRating}
                                />
                            </div>
                        )}

                        <div id={styles.right_lower_content}>
                            <div className={styles.lower_content_line}>
                                {/*Display country(s) of origin */}
                                <div>
                                    {movieData?.production_countries?.map((country, index) => (
                                        <img
                                            key={index}
                                            className={styles.flag}
                                            src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`}
                                            alt={country.name}
                                        />
                                    ))}
                                </div>
                                {/*Release Date */}
                                <span>&#9679;</span>
                                <span>{movieData?.release_date}</span>
                                {/*Release Date */}
                                <span>&#9679;</span>
                                <span>
                                    {movieData?.runtime > 60 && Math.floor(movieData.runtime / 60) + "h"}{" "}
                                    {movieData.runtime % 60}m
                                </span>

                                {/* Website */}
                                {movieData.homepage && (
                                    <>
                                        <span>&#9679;</span>
                                        <p>
                                            Website: <a href={movieData.homepage}>{movieData.homepage}</a>
                                        </p>
                                    </>
                                )}
                            </div>

                            {/*Display available languages */}
                            <div className={styles.lower_content_line}>
                                {movieData?.spoken_languages?.length && (
                                    <h4>
                                        Available languages:
                                        <span id={styles.lang_font}>
                                            {" "}
                                            {movieData?.spoken_languages
                                                ?.map((lang) =>
                                                    lang.name !== lang.english_name
                                                        ? lang.name + "/" + lang.english_name
                                                        : lang.english_name
                                                )
                                                .join(", ")}
                                        </span>
                                    </h4>
                                )}
                            </div>
                            {/*Produced by */}
                            <div className={styles.lower_content_line}>
                                <h4>
                                    Produced by:
                                    <span id={styles.prod_font}>
                                        {" "}
                                        {movieData?.production_companies?.map((prod) => prod.name).join(", ")}
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Watch provider data */}
                <WatchProviders watchProviders={watchProviders} title={movieData.title} />
                {/* Gallery */}
                {movieImages?.backdrops?.length && (
                    <IndexedImageRow
                        title={"Gallery"}
                        media={movieImages.backdrops}
                        setOpen={openArtworkModalWithIndex}
                    />
                )}
                {movieImages?.backdrops?.length && (
                    <BasicModal
                        open={openArtworkModal}
                        handleClose={closeArtworkModal}
                        children={
                            <ImageCarousel
                                imageIndex={artworkModalIndex}
                                setImageIndex={setArtworkModalIndex}
                                images={movieImages.backdrops}
                                mediaTitle={movieData.title || movieData.original_title}
                            />
                        }
                    />
                )}
                {/* Videos with modal */}
                {movieVideos?.length && (
                    <BasicModal
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <YouTube
                                videoId={movieVideos[videoModalIndex].key}
                                opts={{
                                    height: "550px",
                                    width: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                    },
                                }}
                            />
                        }
                    />
                )}
                {movieVideos?.length && <VideoTrailerRow videos={movieVideos} setOpen={openVideoModalWithIndex} />}
                {/*Credits */}
                {Object.keys(movieCredits).length && <Credits credits={movieCredits?.cast} title={"Cast"} />}{" "}
                {Object.keys(movieCredits).length && (
                    <Credits credits={combineCrewCredits(movieCredits?.crew)} title={"Crew"} />
                )}{" "}
                {/* Recommended Movies */}
                <MediaCardRow media={recommendedMovies} title="Recommended Movies" mediaType="movie" size="N" />
                {/* Similar Movies */}
                <MediaCardRow media={similarMovies} title="Similar Movies" mediaType="movie" size="N" />
                {/* Reviews */}
                <Reviews reviews={reviews} />
            </div>
        </>
    );
};

export default Movie;
