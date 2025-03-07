import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/TVShow.module.css";
import { Rating } from "@mui/material";
import Credits from "../utility/Credits/Credits";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import YouTube from "react-youtube";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";

const TVShow = () => {
    const [tvShowData, setTvShowData] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [tvShowAggCredits, setTvShowAggCredits] = useState({});
    const [tvShowImages, setTvShowImages] = useState({});
    const [tvShowVideos, setTvShowVideos] = useState([]);
    const [recommendedTv, setRecommendedTv] = useState([]);
    const [similarTv, setSimilarTv] = useState([]);
    const [watchProviders, setWatchProviders] = useState([]);
    const [reviews, setReviews] = useState({});

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

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

        // Images
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

        // Recommendations
        makeApiCall(`${BASE_URL}/tv/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log("==== Videos ====");
                console.log(response.results);
                setRecommendedTv(response.results);
            }
        );

        // Similar
        makeApiCall(`${BASE_URL}/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("==== Videos ====");
            console.log(response.results);
            setSimilarTv(response.results);
        });

        // Similar
        makeApiCall(`${BASE_URL}/tv/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log("==== Videos ====");
                console.log(response.results);
                setWatchProviders(response.results);
            }
        );

        // Similar
        makeApiCall(`${BASE_URL}/tv/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("==== Reviews ====");
            console.log(response);
            setReviews(response);
        });
    }, []);

    const openArtworkModalWithIndex = (index) => {
        setOpenArtworkModal(true);
        setArtworkModalIndex(index);
    };

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

    //Code html here
    return (
        <>
            <div className={styles.wrapper}>
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
                        {/*Ratings mui here*/}
                        <div className={styles.rating_container}>
                            <Rating value={tvShowData.vote_average / 2} precision={0.1} readOnly />
                            <p>Average Score: {Number(tvShowData.vote_average / 2).toFixed(1)}/5</p>
                            <p id={styles.num_votes}>Votes: {tvShowData.vote_count}</p>
                        </div>
                        {/*Misc info */}
                        <h3>Details:</h3>
                        {/*seasons&episodes info */}
                        <div className={styles.s_e_info}>
                            <p>
                                Seasons: {tvShowData?.number_of_seasons}, Episodes: {tvShowData?.number_of_episodes}
                            </p>
                            <p>
                                Aired: {tvShowData?.first_air_date} to {tvShowData?.last_air_date}
                            </p>
                            <p>Status: {tvShowData?.status}</p>
                        </div>
                        {/*show homepage link if available */}
                        {tvShowData.homepage && (
                            <p id={styles.homepage_link}>
                                Website: <a href={tvShowData.homepage}>{tvShowData.homepage}</a>
                            </p>
                        )}
                        <h3>Genres:</h3> {/*genre display */}
                        <div className={styles.genre_container}>
                            <p>{tvShowData?.genres?.map((genre) => genre.name).join(", ")}</p>
                        </div>
                        {/*Display country(s) of origin */}
                        {tvShowData?.production_countries?.map((country, index) => (
                            <img
                                key={index}
                                id={styles.flag}
                                src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`}
                                alt={country.name}
                            />
                        ))}
                        {/*Display available languages */}
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
                        {/*Produced by */}
                        <h4>
                            Produced by:
                            <span id={styles.prod_font}>
                                {" "}
                                {tvShowData?.production_companies?.map((prod) => prod.name).join(", ")}
                            </span>
                        </h4>
                    </div>
                </div>
                {/* Watch provider data */}
                <WatchProviders watchProviders={watchProviders} title={tvShowData.name} />
                {/*carousel(s) go here */}
                {tvShowImages.backdrops && (
                    <IndexedImageRow
                        title={"Gallery"}
                        media={tvShowImages.backdrops}
                        setOpen={openArtworkModalWithIndex}
                    />
                )}
                {tvShowImages.backdrops && (
                    <BasicModal
                        open={openArtworkModal}
                        handleClose={closeArtworkModal}
                        children={
                            <ImageCarousel
                                imageIndex={artworkModalIndex}
                                setImageIndex={setArtworkModalIndex}
                                images={tvShowImages.backdrops}
                                mediaTitle={tvShowData.name || tvShowData.original_name}
                            />
                        }
                    />
                )}
                {tvShowVideos?.length && <VideoTrailerRow videos={tvShowVideos} setOpen={openVideoModalWithIndex} />}
                {tvShowVideos?.length && (
                    <BasicModal
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <YouTube
                                videoId={tvShowVideos[videoModalIndex].key}
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
                {/*Credit Component */}
                {Object.keys(tvShowAggCredits).length && (
                    <Credits credits={tvShowAggCredits?.cast} title={"Cast"} />
                )}{" "}
                {Object.keys(tvShowAggCredits).length && <Credits credits={tvShowAggCredits?.crew} title={"Crew"} />}{" "}
                {/* Recommended Movies */}
                <MediaCardRow media={recommendedTv} title="Recommended Shows" mediaType="tv" size="N" />
                {/* Similar Movies */}
                <MediaCardRow media={similarTv} title="Similar Shows" mediaType="tv" size="N" />
                {/* Reviews */}
                <Reviews reviews={reviews} />
            </div>
        </>
    );
};

export default TVShow;
