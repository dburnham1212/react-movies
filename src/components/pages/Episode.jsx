import { useEffect, useState, useContext } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
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

    // Account states if a user is logged in
    const [accountStates, setAccountStates] = useState({});
    const [accountStateChangeAlert, setAccountStateChangeAlert] = useState("");

    // Rating modal states
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(2.5);

    const { showId, seasonNumber, episodeNumber } = useParams();

    // Context providers
    const { isAuthenticated, getSessionId } = useContext(userContext);

    useEffect(() => {
        // check if the user is authenticated or not
        if (isAuthenticated()) {
            // if so get their current account states for the selected movie
            makeApiCall(
                `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/account_states?api_key=${
                    process.env.REACT_APP_API_KEY
                }&session_id=${getSessionId()}`
            ).then((response) => {
                // set account states based on response
                setAccountStates(response);
                // update the rating value locally to be the same as the one that is saved
                if (response.rated) setRatingValue((response.rated.value / 2).toFixed(1));
            });
        }

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
            `${BASE_URL}/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating?api_key=${
                process.env.REACT_APP_API_KEY
            }&session_id=${getSessionId()}`
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
