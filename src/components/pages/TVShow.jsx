import { useState, useEffect, useContext } from "react";
import { makeApiCall, makeDeleteApiCall, makePostApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/TVShow.module.css";
import { IconButton, Rating, Tooltip } from "@mui/material";
import Credits from "../utility/Credits/Credits";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import YouTube from "react-youtube";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";
import { userContext } from "../context/UserContext";
import { FavoriteOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TvIcon from "@mui/icons-material/Tv";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AlertMessage from "../utility/Alerts/AlertMessage";
import RatingModal from "../utility/Modals/RatingModal";
import { combineCrewCredits } from "../../helper/helperFunctions";
import MediaInfo from "../utility/MediaInfo/MediaInfo";

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

    // ----- Dynamic states -----
    // Account states if a user is logged in
    const [accountStates, setAccountStates] = useState({});
    const [accountStateChangeAlert, setAccountStateChangeAlert] = useState("");

    // Rating modal states
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    // Context providers
    const { isAuthenticated, accountId, getSessionId } = useContext(userContext);

    const { id } = useParams();

    //Function to get api data from db
    useEffect(() => {
        // check if the user is authenticated or not
        if (isAuthenticated()) {
            // if so get their current account states for the selected movie
            makeApiCall(
                `${BASE_URL}/tv/${id}/account_states?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`
            ).then((response) => {
                // set account states based on response
                setAccountStates(response);
                // update the rating value locally to be the same as the one that is saved
                if (response.rated) setRatingValue((response.rated.value / 2).toFixed(1));
            });
        }

        makeApiCall(`${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("====TV Show Data====");
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
                { media_type: "tv", media_id: id, favorite: false }
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
                { media_type: "tv", media_id: id, favorite: true }
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
                { media_type: "tv", media_id: id, watchlist: false }
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
                { media_type: "tv", media_id: id, watchlist: true }
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
            `${BASE_URL}/tv/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`,
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
            `${BASE_URL}/tv/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`
        );
        // update locally
        setAccountStates({ ...accountStates, rated: false });
        setRatingValue(2.5);
        // close modal
        closeRatingModal();
        // Show appropriate alert message
        setAccountStateChangeAlert("Rating deleted");
    };

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
                <MediaInfo
                    mediaData={tvShowData}
                    mediaType="TVShow"
                    showAuthOptions={true}
                    accountStates={accountStates}
                    isAuthenticated={isAuthenticated}
                    toggleFavourite={toggleFavourite}
                    toggleWatchlist={toggleWatchlist}
                    accountStateChangeAlert={accountStateChangeAlert}
                    ratingModalOpen={ratingModalOpen}
                    openRatingModal={openRatingModal}
                    closeRatingModal={closeRatingModal}
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                    deleteRating={deleteRating}
                    saveRating={saveRating}
                />
                <div class={styles.seasons_container}>
                    <h3>Seasons</h3>
                    <div className={styles.seasons_list}>
                        {tvShowData?.seasons?.map((season) => (
                            <a key={season.id} href={`/tv/${tvShowData.id}/season/${season.season_number}`}>
                                <div className={styles.season_content}>
                                    {season.poster_path ? (
                                        <img
                                            src={BASE_IMAGE_URL + season.poster_path}
                                            alt={season.name}
                                            height={"250px"}
                                        />
                                    ) : (
                                        <img src={"/images/NO_IMAGE_FOUND.jpg"} alt={season.name} height={"250px"} />
                                    )}
                                    <div className={styles.season_info}>
                                        <h3>{season.name}</h3>
                                        <p>{season.overview}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
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
                {Object.keys(tvShowAggCredits).length && (
                    <Credits credits={combineCrewCredits(tvShowAggCredits?.crew)} title={"Crew"} />
                )}{" "}
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
