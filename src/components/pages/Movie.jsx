import { useState, useEffect, useContext } from "react";
import { makeApiCall, makeDeleteApiCall, makePostApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Movie.module.css";
import Credits from "../utility/Credits/Credits";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import { Button, IconButton, Modal, Rating } from "@mui/material";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import YouTube from "react-youtube";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";
import { userContext } from "../context/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavoriteOutlined } from "@mui/icons-material";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TvIcon from "@mui/icons-material/Tv";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Movie = () => {
    const [movieData, setMovieData] = useState({});
    const [movieImages, setMovieImages] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieCredits, setMovieCredits] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [watchProviders, setWatchProviders] = useState({});

    const [accountStates, setAccountStates] = useState({});

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    const { isAuthenticated, accountId, getSessionId } = useContext(userContext);

    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated()) {
            makeApiCall(
                `${BASE_URL}/movie/${id}/account_states?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`
            ).then((response) => {
                console.log("===== Account States =====");
                console.log(response);
                setAccountStates(response);
                if (response.rated) setRatingValue((response.rated.value / 2).toFixed(1));
            });
        }
        makeApiCall(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieData(response);
        });

        makeApiCall(`${BASE_URL}/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieImages(response);
        });

        makeApiCall(`${BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response.results);
            setMovieVideos(response.results.filter((video) => video.site === "YouTube"));
        });

        makeApiCall(`${BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieCredits(response);
        });

        makeApiCall(`${BASE_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response.results);
            setSimilarMovies(response.results);
        });

        makeApiCall(`${BASE_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response.results);
                setRecommendedMovies(response.results);
            }
        );

        makeApiCall(`${BASE_URL}/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response);
                setWatchProviders(response.results);
            }
        );

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
        }
    };

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
        }
    };

    const openRatingModal = () => {
        setRatingModalOpen(true);
    };

    const closeRatingModal = () => {
        setRatingModalOpen(false);
    };

    const saveRating = () => {
        makePostApiCall(
            `${BASE_URL}/movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`,
            { value: ratingValue * 2 }
        );
        setAccountStates({ ...accountStates, rated: { value: ratingValue * 2 } });
        closeRatingModal();
    };

    const deleteRating = () => {
        makeDeleteApiCall(
            `${BASE_URL}/movie/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`
        );
        setAccountStates({ ...accountStates, rated: false });
        setRatingValue(2.5);
        closeRatingModal();
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

    const openVideoModalWithIndex = (index) => {
        setOpenVideoModal(true);
        setVideoModalIndex(index);
    };

    const closeVideoModal = () => {
        setOpenVideoModal(false);
    };

    return (
        <>
            <div className="wrapper">
                <div className={styles.container}>
                    <div className={styles.content_left}>
                        <img
                            src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                            alt={`${movieData.title} poster`}
                            width={"360"}
                        />
                        {isAuthenticated() && (
                            <div>
                                <IconButton color="warning" variant="contained" onClick={toggleFavourite}>
                                    {accountStates.favorite ? <FavoriteOutlined /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <IconButton color="warning" variant="contained" onClick={toggleWatchlist}>
                                    {accountStates.watchlist ? <DesktopWindowsIcon /> : <TvIcon />}
                                </IconButton>
                                <IconButton color="warning" variant="contained" onClick={openRatingModal}>
                                    {accountStates?.rated?.value ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                                <BasicModal
                                    open={ratingModalOpen}
                                    handleClose={closeRatingModal}
                                    children={
                                        <>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: " center",
                                                }}
                                            >
                                                <h1>Add Rating For:</h1>
                                                <h2>{movieData.title}</h2>
                                                <Rating
                                                    sx={{ fontSize: "4rem" }}
                                                    value={ratingValue}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setRatingValue(newValue);
                                                    }}
                                                />
                                                <div style={{ display: "flex", gap: "1.5rem", margin: "1rem" }}>
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        size="large"
                                                        onClick={deleteRating}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        size="large"
                                                        onClick={saveRating}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.content_right}>
                        <h1>{movieData.title}</h1>
                        {movieData.original_title !== movieData.title && <h3>{movieData.original_title}</h3>}
                        {movieData.tagline && (
                            <p>
                                <i>{movieData.tagline}</i>
                            </p>
                        )}
                        <p>{movieData.overview}</p>
                        {movieData.adult && <p>Adults Only</p>}

                        <div className={styles.rating_container}>
                            <Rating value={movieData.vote_average / 2} precision={0.1} readOnly />
                            <p>Average Score: {Number(movieData.vote_average / 2).toFixed(1)}/5</p>
                            <p id={styles.num_votes}>Votes: {movieData.vote_count}</p>
                        </div>
                        {isAuthenticated() && (
                            <>
                                <h4>My Rating</h4>
                                {accountStates?.rated?.value ? (
                                    <Rating value={accountStates.rated.value / 2} precision={0.5} readOnly />
                                ) : (
                                    <p>No Rating Saved</p>
                                )}
                            </>
                        )}
                        {/*Misc info */}
                        <h3>Details:</h3>
                        {/*Movie info */}
                        <div className={styles.s_e_info}>
                            <p>Release Date: {movieData?.release_date}</p>
                        </div>
                        {movieData.homepage && (
                            <p>
                                Website: <a href={movieData.homepage}>{movieData.homepage}</a>
                            </p>
                        )}
                        {movieData?.genres?.length === 1 ? <h4>Genre:</h4> : <h4>Genres:</h4>}
                        <div className={styles.genre_container}>
                            <p>{movieData?.genres?.map((genre) => genre.name).join(", ")}</p>
                        </div>

                        {/*Display country(s) of origin */}
                        {movieData?.production_countries?.map((country, index) => (
                            <img
                                key={index}
                                id={styles.flag}
                                src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`}
                                alt={country.name}
                            />
                        ))}
                        {/*Display available languages */}
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
                        {/*Produced by */}
                        <h4>
                            Produced by:
                            <span id={styles.prod_font}>
                                {" "}
                                {movieData?.production_companies?.map((prod) => prod.name).join(", ")}
                            </span>
                        </h4>
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
                {Object.keys(movieCredits).length && <Credits credits={movieCredits?.crew} title={"Crew"} />}{" "}
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
