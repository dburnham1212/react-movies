import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Episode.module.css";

import StarIcon from "@mui/icons-material/Star";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import YouTube from "react-youtube";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import Credits from "../utility/Credits/Credits";
import { combineCrewCredits } from "../../helper/helperFunctions";

const Episode = () => {
    const [tvShowData, setTvShowData] = useState({});
    const [seasonDetails, setSeasonDetails] = useState({});
    const [episodeData, setEpisodeData] = useState({});
    const [watchProviders, setWatchProviders] = useState([]);
    const [episodeImages, setEpsiodeImages] = useState({});
    const [epsiodeVideos, setEpisodeVideos] = useState([]);
    const [epsiodeCredits, setEpisodeCredits] = useState({});

    // Gallery modal states
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    // Video modal states
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    const { showId, seasonNumber, episodeNumber } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/tv/${showId}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setTvShowData(response);
        });

        makeApiCall(`${BASE_URL}/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response);
                setSeasonDetails(response);
            }
        );

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setEpisodeData(response);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setWatchProviders(response.results);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/images?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setEpsiodeImages(response);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setEpisodeVideos(response.results);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setEpisodeCredits(response);
        });
    }, []);

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
                        <h1>{episodeData.name}</h1>
                        <h3>{tvShowData.name}</h3>
                        <h3>{seasonDetails.name}</h3>
                    </div>
                    <div className={styles.movie_ratings}>
                        {/* Overall movie rating */}
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>{Number(episodeData.vote_average / 2).toFixed(1)}</span>/5
                                </p>
                            </div>
                            <p id={styles.num_votes}>Votes: {episodeData.vote_count}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.content_left}>
                        {episodeData.still_path ? (
                            <img
                                src={`${BASE_IMAGE_URL}${episodeData.still_path}`}
                                alt={`${episodeData.title} poster`}
                                width={"360"}
                            />
                        ) : (
                            <img
                                className={styles.no_still}
                                src={"/images/NO_IMAGE_FOUND.jpg"}
                                alt={`${episodeData.title} no poster `}
                                width={"360"}
                            />
                        )}
                    </div>
                    <div className={styles.content_right}>
                        <div id={styles.right_upper_content}>
                            <p id={styles.episode_line}>Episode: {episodeData.episode_number}</p>
                            <p id={styles.overview}>{episodeData.overview}</p>
                            {tvShowData?.genres?.length === 1 ? <h3>Genre:</h3> : <h3>Genres:</h3>}
                            <div className={styles.genre_container}>
                                <p id={styles.genres}>{tvShowData?.genres?.map((genre) => genre.name).join(", ")}</p>
                            </div>
                            {tvShowData.adult && <p>Adults Only</p>}
                        </div>
                        <div id={styles.right_lower_content}>
                            <div className={styles.lower_content_line}>
                                {/*Display country(s) of origin */}
                                <div>
                                    {tvShowData?.production_countries?.map((country, index) => (
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
                                <span>{episodeData?.air_date}</span>
                                {/*Release Date */}
                                <span>&#9679;</span>
                                <span>
                                    {episodeData?.runtime > 60 && Math.floor(episodeData.runtime / 60) + "h"}{" "}
                                    {episodeData.runtime % 60}m
                                </span>

                                {/* Website */}
                                {tvShowData.homepage && (
                                    <>
                                        <span>&#9679;</span>
                                        <p>
                                            Website: <a href={tvShowData.homepage}>{tvShowData.homepage}</a>
                                        </p>
                                    </>
                                )}
                            </div>

                            {/*Display available languages */}
                            <div className={styles.lower_content_line}>
                                {tvShowData?.spoken_languages?.length && (
                                    <h4>
                                        Available languages:
                                        <span id={styles.lang_font}>
                                            {" "}
                                            {tvShowData?.spoken_languages
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
                                        {tvShowData?.production_companies?.map((prod) => prod.name).join(", ")}
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Watch provider data */}
                <WatchProviders watchProviders={watchProviders} title={tvShowData.name} />
                {/* Gallery */}
                {episodeImages?.stills?.length && (
                    <IndexedImageRow
                        title={"Gallery"}
                        media={episodeImages.stills}
                        setOpen={openArtworkModalWithIndex}
                    />
                )}
                {episodeImages?.stills?.length && (
                    <BasicModal
                        open={openArtworkModal}
                        handleClose={closeArtworkModal}
                        children={
                            <ImageCarousel
                                imageIndex={artworkModalIndex}
                                setImageIndex={setArtworkModalIndex}
                                images={episodeImages.stills}
                                mediaTitle={tvShowData.title}
                            />
                        }
                    />
                )}
                {/* Videos with modal */}
                {epsiodeVideos?.length && (
                    <BasicModal
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <YouTube
                                videoId={epsiodeVideos[videoModalIndex].key}
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
                {epsiodeVideos?.length && <VideoTrailerRow videos={epsiodeVideos} setOpen={openVideoModalWithIndex} />}
                {/*Credits */}
                {Object.keys(epsiodeCredits).length && <Credits credits={epsiodeCredits?.cast} title={"Cast"} />}{" "}
                {Object.keys(epsiodeCredits).length && (
                    <Credits credits={combineCrewCredits(epsiodeCredits?.crew)} title={"Crew"} />
                )}{" "}
            </div>
        </>
    );
};

export default Episode;
