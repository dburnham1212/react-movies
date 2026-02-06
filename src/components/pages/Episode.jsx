import { useEffect, useState, useContext } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Episode.module.css";

import WatchProviders from "../utility/WatchProviders/WatchProviders";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import YouTube from "react-youtube";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import Credits from "../utility/Credits/Credits";
import { makePostApiCall, makeDeleteApiCall } from "../../helper/helperFunctions";
import { combineCrewCredits } from "../../helper/helperFunctions";
import MediaInfo from "../utility/MediaInfo/MediaInfo";
import { userContext } from "../context/UserContext";
import MediaInfoSkeleton from "../utility/MediaInfo/MediaInfoSkeleton";
import { Box } from "@mui/material";

const Episode = () => {
    const navigate = useNavigate();
    const [tvShowData, setTvShowData] = useState({});
    const [seasonDetails, setSeasonDetails] = useState({});
    const [episodeData, setEpisodeData] = useState({});
    const [watchProviders, setWatchProviders] = useState([]);
    const [episodeImages, setEpsiodeImages] = useState({});
    const [epsiodeVideos, setEpisodeVideos] = useState([]);
    const [epsiodeCredits, setEpisodeCredits] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // API error redirect
    const redirectToError = (msg = "") => {
        navigate("/404", { replace: true, state: { msg } });
    };

    // Gallery modal states
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    // Video modal states
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    // Account states if a user is logged in
    const [accountStates, setAccountStates] = useState({});
    const [accountStateChangeAlert, setAccountStateChangeAlert] = useState("");

    // Rating modal states
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    const { showId, seasonNumber, episodeNumber } = useParams();

    // Context providers
    const { isAuthenticated, getSessionId } = useContext(userContext);

    const fetchEpisodeData = async () => {
        setIsLoading(true);

        try {
            const [
                accountStatesResponse,
                tvShowDataResponse,
                seasonDataResponse,
                episodeDataResponse,
                watchProvidersResponse,
                imagesResponse,
                videosResponse,
                creditsResponse,
            ] = await Promise.all([
                isAuthenticated()
                    ? makeApiCall(
                          `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/account_states?api_key=${
                              process.env.REACT_APP_API_KEY
                          }&session_id=${getSessionId()}`,
                      )
                    : Promise.resolve(null),
                makeApiCall(`${BASE_URL}/tv/${showId}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.REACT_APP_API_KEY}`,
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`,
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/images?api_key=${process.env.REACT_APP_API_KEY}`,
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
                ),
            ]);

            // catch all for responses
            const requiredResponses = [
                () => tvShowDataResponse?.id,
                () => seasonDataResponse?.id,
                () => episodeDataResponse?.id,
            ];

            // if any api is null, undefined, or missing data (partial API failures)
            const missingResponse = requiredResponses.some((responseCheck) => !responseCheck());
            if (missingResponse) {
                redirectToError("402 API error (no response)");
                return;
            }

            if (accountStatesResponse) {
                setAccountStates(accountStatesResponse);

                if (accountStatesResponse.rated) setRatingValue((accountStatesResponse.rated.value / 2).toFixed(1));
            }

            setTvShowData(tvShowDataResponse);
            setSeasonDetails(seasonDataResponse);
            setEpisodeData(episodeDataResponse);
            setWatchProviders(watchProvidersResponse.results);
            setEpsiodeImages(imagesResponse);
            setEpisodeVideos(videosResponse.results.filter((video) => video.site === "YouTube"));
            setEpisodeCredits(creditsResponse);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEpisodeData();
    }, []);

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
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${
                process.env.REACT_APP_API_KEY
            }&session_id=${getSessionId()}`,
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
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${
                process.env.REACT_APP_API_KEY
            }&session_id=${getSessionId()}`,
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
                {isLoading ? (
                    <MediaInfoSkeleton mediaType="episode" />
                ) : (
                    <MediaInfo
                        mediaData={tvShowData}
                        mediaSeasonData={seasonDetails}
                        mediaEpisodeData={episodeData}
                        mediaType="episode"
                        showAuthOptions={true}
                        isAuthenticated={isAuthenticated}
                        accountStates={accountStates}
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
                        mediaType="video"
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <Box sx={{ width: "100%", aspectRatio: "16 / 9" }}>
                                <YouTube
                                    videoId={epsiodeVideos[videoModalIndex]?.key}
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
