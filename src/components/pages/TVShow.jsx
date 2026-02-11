// React
import { useState, useEffect, useContext } from "react";

// Third-party libraries
import { useParams, useNavigate, Link } from "react-router-dom";
import YouTube from "react-youtube";

// Context
import { userContext } from "../context/UserContext";

// Helpers
import { makeApiCall, makeDeleteApiCall, makePostApiCall, combineCrewCredits } from "../../helper/helperFunctions";

// Constants
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";

// Page styles
import styles from "../../styles/pages/TVShow.module.css";

// Components
import BasicModal from "../utility/Modals/BasicModal";
import MediaInfo from "../utility/MediaInfo/MediaInfo";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import MediaCardRow from "../utility/ImageRows/MediaCardRow";
import Credits from "../utility/Credits/Credits";
import WatchProviders from "../utility/WatchProviders/WatchProviders";
import Reviews from "../utility/Reviews/Reviews";
import MediaInfoSkeleton from "../utility/MediaInfo/MediaInfoSkeleton";
import { Box } from "@mui/material";

const TVShow = () => {
    const navigate = useNavigate();
    const [tvShowData, setTvShowData] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [tvShowAggCredits, setTvShowAggCredits] = useState({});
    const [tvShowImages, setTvShowImages] = useState({});
    const [tvShowVideos, setTvShowVideos] = useState([]);
    const [recommendedTv, setRecommendedTv] = useState([]);
    const [similarTv, setSimilarTv] = useState([]);
    const [watchProviders, setWatchProviders] = useState([]);
    const [reviews, setReviews] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // API error redirect
    const redirectToError = (msg = "") => {
        navigate("/404", { replace: true, state: { msg } });
    };

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

    const fetchTvData = async () => {
        setIsLoading(true);

        try {
            const [
                accountStatesResponse,
                tvShowDataResponse,
                watchProvidersResponse,
                imagesResponse,
                videosResponse,
                creditsResponse,
                aggCreditsResponse,
                similarResponse,
                recommendationsResponse,
                reviewsResponse,
            ] = await Promise.all([
                isAuthenticated()
                    ? makeApiCall(
                          `${BASE_URL}/tv/${id}/account_states?api_key=${
                              process.env.REACT_APP_API_KEY
                          }&session_id=${getSessionId()}`,
                      )
                    : Promise.resolve(null),
                makeApiCall(`${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`),
            ]);

            //catch all for responses
            const requiredResponses = [
                //if exists, return .___, else return undefined
                () => tvShowDataResponse?.id, //identifying property from json object
            ];

            //if any api is null, undefined, or missing data (partial API failures)
            const missingResponse = requiredResponses.some((responseCheck) => !responseCheck()); // if validation for any api call fails (!responseCheck())
            if (missingResponse) {
                redirectToError("402 API error (no response)");
                return;
            }

            if (accountStatesResponse) {
                setAccountStates(accountStatesResponse);

                if (accountStatesResponse.rated) setRatingValue((accountStatesResponse.rated.value / 2).toFixed(1));
            }

            setTvShowData(tvShowDataResponse);
            setWatchProviders(watchProvidersResponse?.results ?? {});
            setTvShowImages(imagesResponse ?? {});
            setTvShowVideos((videosResponse.results ?? []).filter((video) => video.site === "YouTube"));
            setTvShowCredits(creditsResponse ?? { cast: [], crew: [] });
            setTvShowAggCredits(aggCreditsResponse ?? { cast: [], crew: [] });
            setSimilarTv(similarResponse?.results ?? []);
            setRecommendedTv(recommendationsResponse?.results ?? []);
            setReviews(reviewsResponse?.results ?? []);
        } catch (error) {
            console.log(error);
            // exceptions, network failures, rejected promises
            redirectToError("402 API error (exception)");
        } finally {
            setIsLoading(false);
        }
    };

    //Function to get api data from db
    useEffect(() => {
        window.scrollTo(0, 0);

        fetchTvData();
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
                { media_type: "tv", media_id: id, favorite: false },
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
                { media_type: "tv", media_id: id, favorite: true },
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
                { media_type: "tv", media_id: id, watchlist: false },
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
                { media_type: "tv", media_id: id, watchlist: true },
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
            { value: ratingValue * 2 },
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
            `${BASE_URL}/tv/${id}/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`,
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
            <div className="wrapper">
                {isLoading ? (
                    <MediaInfoSkeleton mediaType="TVShow" />
                ) : (
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
                )}
                <div className={styles.seasons_container}>
                    <h3>Seasons</h3>
                    <div className={styles.seasons_list}>
                        {tvShowData?.seasons?.map((season) => (
                            <Link key={season.id} to={`/tv/${tvShowData.id}/season/${season.season_number}`}>
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
                            </Link>
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
                        mediaType="video"
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <Box sx={{ width: "100%", aspectRatio: "16 / 9" }}>
                                <YouTube
                                    videoId={tvShowVideos[videoModalIndex]?.key}
                                    opts={{
                                        width: "100%",
                                        height: "100%",
                                        playerVars: { autoplay: 1 },
                                    }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </Box>
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
