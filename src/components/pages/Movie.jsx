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

const Movie = () => {
    const [movieData, setMovieData] = useState({});
    const [movieImages, setMovieImages] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieCredits, setMovieCredits] = useState({});

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
                <div className={styles.container}>
                    <div className={styles.content_left}>
                        <img
                            src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                            alt={`${movieData.title} poster`}
                            width={"360"}
                        />
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
                <Credits />
            </div>
        </>
    );
};

export default Movie;
