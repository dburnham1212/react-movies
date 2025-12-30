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
import MediaInfo from "../utility/MediaInfo/MediaInfo";

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
                <MediaInfo
                    mediaData={tvShowData}
                    mediaSeasonData={seasonDetails}
                    mediaEpisodeData={episodeData}
                    mediaType="episode"
                    showAuthOptions={false}
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
