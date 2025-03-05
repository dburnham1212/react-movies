import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Movie.module.css";
import Credits from "../utility/Credits/Credits";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import { Rating } from "@mui/material";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import YouTube from "react-youtube";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";
import StarIcon from "@mui/icons-material/Star";

const Movie = () => {
    const [movieData, setMovieData] = useState({});
    const [movieImages, setMovieImages] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieCredits, setMovieCredits] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [watchProviders, setWatchProviders] = useState({});

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    const { id } = useParams();

    useEffect(() => {
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
                <div className={styles.main_container}>
                    <div className={styles.title_container}>
                        <div>
                            <h1 className={styles.main_title}>{movieData.title}</h1>
                            {movieData.original_title !== movieData.title && <h3>{movieData.original_title}</h3>}
                            {movieData.tagline && (
                                <p>
                                    <i>{movieData.tagline}</i>
                                </p>
                            )}
                        </div>

                        {/*Display country(s) of origin */}
                        <div
                            className={styles.rating_container}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "1rem",
                                borderRadius: ".25rem",
                                backgroundColor: "#2e2e2e",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <StarIcon sx={{ color: "#fea423" }} />
                                <p style={{ margin: 0, padding: 0, fontSize: "1.2rem" }}>
                                    {Number(movieData.vote_average / 2).toFixed(1)}/5
                                </p>
                            </div>
                            <p style={{ margin: 0, padding: 0 }}>Votes: {movieData.vote_count}</p>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.content_left}>
                            <img
                                src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                                alt={`${movieData.title} poster`}
                                width={"300"}
                                style={{ borderRadius: ".25rem" }}
                            />
                        </div>
                        <div className={styles.content_right}>
                            <div>
                                <p style={{ fontSize: "1.2rem" }}>{movieData.overview}</p>
                                {movieData.adult && <p>Adults Only</p>}
                                {movieData?.genres?.length === 1 ? <h2>Genre:</h2> : <h2>Genres:</h2>}
                                <div className={styles.genre_container}>
                                    <p style={{ fontSize: "1.2rem" }}>
                                        {movieData?.genres?.map((genre) => genre.name).join(" | ")}
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}></div>
                            </div>
                            <div>
                                <div style={{ display: "flex", gap: ".5rem", margin: ".25rem 0" }}>
                                    <div className={styles.flag_container}>
                                        {movieData?.production_countries?.map((country, index) => (
                                            <img
                                                key={index}
                                                id={styles.flag}
                                                src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`}
                                                alt={country.name}
                                            />
                                        ))}
                                    </div>
                                    <p style={{ padding: 0, margin: 0 }}>&#8226;</p>
                                    <p style={{ padding: 0, margin: 0 }}>{movieData?.release_date}</p>

                                    {movieData.homepage && (
                                        <>
                                            <p style={{ padding: 0, margin: 0 }}>&#8226;</p>{" "}
                                            <a href={movieData.homepage}>Website</a>
                                        </>
                                    )}
                                </div>

                                {/*Display available languages */}
                                {movieData?.spoken_languages?.length && (
                                    <h4
                                        style={{
                                            borderBottom: "1px solid lightgrey",
                                            borderTop: "1px solid lightgrey",
                                            padding: ".5rem 0",
                                            margin: "0",
                                        }}
                                    >
                                        Available languages:
                                        <span id={styles.lang_font}>
                                            {" "}
                                            {movieData?.spoken_languages
                                                ?.map((lang) =>
                                                    lang.name !== lang.english_name
                                                        ? lang.name + "/" + lang.english_name
                                                        : lang.english_name
                                                )
                                                .join(" | ")}
                                        </span>
                                    </h4>
                                )}
                                {/*Produced by */}
                                <h4
                                    style={{
                                        borderBottom: "1px solid lightgrey",
                                        borderTop: "1px solid lightgrey",
                                        padding: ".5rem 0",
                                        margin: "0",
                                    }}
                                >
                                    Produced by:
                                    <span id={styles.prod_font}>
                                        {" "}
                                        {movieData?.production_companies?.map((prod) => prod.name).join(" | ")}
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
