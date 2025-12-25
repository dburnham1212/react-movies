import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL, BASE_IMAGE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";

import styles from "../../styles/pages/Season.module.css";

import StarIcon from "@mui/icons-material/Star";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import YouTube from "react-youtube";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import Credits from "../utility/Credits/Credits";

const Season = () => {
    const [seasonDetails, setSeasonDetails] = useState({});
    const [tvShowData, setTvShowData] = useState({});
    const [seasonImages, setSeasonImages] = useState({});
    const [seasonVideos, setSeasonVideos] = useState([]);
    const [seasonCredits, setSeasonCredits] = useState({});
    const [watchProviders, setWatchProviders] = useState([]);

    // Gallery modal states
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    // Video modal states
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    const { showId, seasonNumber } = useParams();

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
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/images?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setSeasonImages(response);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setSeasonVideos(response.results);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setSeasonCredits(response);
        });

        makeApiCall(
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            console.log(response);
            setWatchProviders(response.results);
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
                        <h1 className={styles.title}>{tvShowData.name}</h1>
                        <h3>{seasonDetails.name}</h3>
                    </div>
                    <div className={styles.seasonRatings}>
                        {/* Overall movie rating */}
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>{Number(seasonDetails.vote_average / 2).toFixed(1)}</span>/5
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.content_left}>
                        <img
                            src={`${BASE_IMAGE_URL}${seasonDetails.poster_path}`}
                            alt={`${tvShowData.name} - ${seasonDetails.name}`}
                            width={"360"}
                        />
                    </div>
                    <div className={styles.content_right}>
                        <div id={styles.right_upper_content}>
                            {/* {movieData.tagline && <p id={styles.tagline}>{movieData.tagline}</p>} */}
                            <p id={styles.overview}>{seasonDetails.overview}</p>
                            {/* Genres */}
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
                                <span>{seasonDetails?.air_date}</span>

                                {/* Website */}
                                {tvShowData.homepage && (
                                    <>
                                        <span>&#9679;</span>
                                        <p>
                                            Website:{" "}
                                            <a href={tvShowData.homepage} target="_blank" rel="noreferrer">
                                                {tvShowData.homepage}
                                            </a>
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
                <div className={styles.episode_container}>
                    <h3>Episodes</h3>
                    <div className={styles.episode_list}>
                        {seasonDetails?.episodes?.map((episode) => (
                            <a
                                href={`/tv/${tvShowData.id}/season/${seasonDetails.season_number}/episode/${episode.episode_number}`}
                            >
                                <div className={styles.episode_content}>
                                    <img
                                        src={BASE_IMAGE_URL + episode.still_path}
                                        alt={episode.name}
                                        height={"150px"}
                                        width={"auto"}
                                    />
                                    <div className={styles.episode_info}>
                                        <h3>{episode.name}</h3>
                                        <p>{episode.overview}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* Watch provider data */}
                <WatchProviders watchProviders={watchProviders} title={tvShowData.name} />
                {/* Gallery */}
                {seasonImages?.posters?.length && (
                    <IndexedImageRow
                        title={"Gallery"}
                        media={seasonImages.posters}
                        setOpen={openArtworkModalWithIndex}
                    />
                )}
                {seasonImages?.posters?.length && (
                    <BasicModal
                        open={openArtworkModal}
                        handleClose={closeArtworkModal}
                        children={
                            <ImageCarousel
                                imageIndex={artworkModalIndex}
                                setImageIndex={setArtworkModalIndex}
                                images={seasonImages.posters}
                                mediaTitle={tvShowData.title}
                                matchHeight={true}
                            />
                        }
                    />
                )}
                {/* Videos with modal */}
                {seasonVideos?.length && (
                    <BasicModal
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <YouTube
                                videoId={seasonVideos[videoModalIndex].key}
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
                {seasonVideos?.length && <VideoTrailerRow videos={seasonVideos} setOpen={openVideoModalWithIndex} />}
                {/*Credits */}
                {Object.keys(seasonCredits).length && <Credits credits={seasonCredits?.cast} title={"Cast"} />}{" "}
                {Object.keys(seasonCredits).length && <Credits credits={seasonCredits?.crew} title={"Crew"} />}{" "}
            </div>
        </>
    );
};

export default Season;
