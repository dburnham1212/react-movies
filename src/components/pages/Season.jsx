import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL, BASE_IMAGE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";

import styles from "../../styles/pages/Season.module.css";

import YouTube from "react-youtube";

import WatchProviders from "../utility/WatchProviders/WatchProviders";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";
import VideoTrailerRow from "../utility/ImageRows/VideoTrailerRow";
import Credits from "../utility/Credits/Credits";

import { combineCrewCredits } from "../../helper/helperFunctions";
import MediaInfo from "../utility/MediaInfo/MediaInfo";
import MediaInfoSkeleton from "../utility/MediaInfo/MediaInfoSkeleton";
import { Box } from "@mui/material";

const Season = () => {
    const [seasonDetails, setSeasonDetails] = useState({});
    const [tvShowData, setTvShowData] = useState({});
    const [seasonImages, setSeasonImages] = useState({});
    const [seasonVideos, setSeasonVideos] = useState([]);
    const [seasonCredits, setSeasonCredits] = useState({});
    const [watchProviders, setWatchProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Gallery modal states
    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    // Video modal states
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoModalIndex, setVideoModalIndex] = useState(0);

    const { showId, seasonNumber } = useParams();

    const fetchSeasonData = async () => {
        setIsLoading(true);

        try {
            const [
                tvShowDataResponse,
                seasonDataResponse,
                watchProvidersResponse,
                imagesResponse,
                videosResponse,
                creditsResponse,
            ] = await Promise.all([
                makeApiCall(`${BASE_URL}/tv/${showId}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/images?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/videos?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/tv/${showId}/season/${seasonNumber}/credits?api_key=${process.env.REACT_APP_API_KEY}`
                ),
            ]);

            setTvShowData(tvShowDataResponse);
            setSeasonDetails(seasonDataResponse);
            setWatchProviders(watchProvidersResponse.results);
            setSeasonImages(imagesResponse);
            setSeasonVideos(videosResponse.results.filter((video) => video.site === "YouTube"));
            setSeasonCredits(creditsResponse);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSeasonData();
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
                {isLoading ? (
                    <MediaInfoSkeleton mediaType="season" />
                ) : (
                    <MediaInfo
                        mediaData={tvShowData}
                        mediaSeasonData={seasonDetails}
                        mediaType="season"
                        showAuthOptions={false}
                    />
                )}
                <div className={styles.episode_container}>
                    <h3>Episodes</h3>
                    <div className={styles.episode_list}>
                        {seasonDetails?.episodes?.map((episode) => (
                            <a
                                key={episode.id}
                                href={`/tv/${tvShowData.id}/season/${seasonDetails.season_number}/episode/${episode.episode_number}`}
                            >
                                <div className={styles.episode_content}>
                                    {episode.still_path ? (
                                        <img
                                            src={BASE_IMAGE_URL + episode.still_path}
                                            alt={episode.name}
                                            height={"150px"}
                                            width={"auto"}
                                        />
                                    ) : (
                                        <img
                                            className={styles.no_episode_image}
                                            src={"/images/NO_IMAGE_FOUND_WIDE.jpg"}
                                            alt={`${tvShowData.name} no poster `}
                                        />
                                    )}
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
                        mediaType="video"
                        open={openVideoModal}
                        handleClose={closeVideoModal}
                        children={
                            <Box sx={{ width: "100%", aspectRatio: "16 / 9" }}>
                                <YouTube
                                    videoId={seasonVideos[videoModalIndex]?.key}
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
                {seasonVideos?.length && <VideoTrailerRow videos={seasonVideos} setOpen={openVideoModalWithIndex} />}
                {/*Credits */}
                {Object.keys(seasonCredits).length && <Credits credits={seasonCredits?.cast} title={"Cast"} />}{" "}
                {Object.keys(seasonCredits).length && (
                    <Credits credits={combineCrewCredits(seasonCredits?.crew)} title={"Crew"} />
                )}{" "}
            </div>
        </>
    );
};

export default Season;
