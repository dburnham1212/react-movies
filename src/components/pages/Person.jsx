import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { Box } from "@mui/material";

// Style Sheet
import styles from "../../styles/pages/Person.module.css";

// Component Imports
import MediaCreditGrid from "../utility/Grids/MediaCreditGrid";
import { combineCrewCredits } from "../../helper/helperFunctions";
import PersonInfo from "../utility/MediaInfo/PersonInfo";
import PersonInfoSkeleton from "../utility/MediaInfo/PersonInfoSkeleton";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";

const Person = () => {
    // ----- Static States -----
    const [personData, setPersonData] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [socials, setSocials] = useState({});
    const [personImages, setPersonImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // ----- Dynamic States -----
    // Gallery modal states
    const [openImageModal, setOpenImageModal] = useState(false);
    const [imageModalIndex, setImageModalIndex] = useState(0);

    // ----- Sorting States -----
    const [movieSortOrder, setMovieSortOrder] = useState("descending");
    const [tvSortOrder, setTvSortOrder] = useState("descending");

    // Params from url
    const { id } = useParams();

    // Fetch persons data from the API
    const fetchPersonData = async () => {
        setIsLoading(true);

        try {
            const [
                personResponse,
                movieCreditsResponse,
                tvCreditsResponse,
                socialsResponse,
                imagesResponse,
            ] = await Promise.all([
                makeApiCall(
                    `${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/person/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`
                ),
                makeApiCall(
                    `${BASE_URL}/person/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
                ),
            ]);

            // Store the API responses in local state
            setPersonData(personResponse);
            setMovieCredits(movieCreditsResponse);
            setTvShowCredits(tvCreditsResponse);
            setSocials(socialsResponse);
            setPersonImages(imagesResponse);
        } catch (error) {
            // Error Message
            console.error("Failed to fetch person data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonData();
    }, []);

    // ----- Modal helpers -----
    const openImageModalWithIndex = (index) => {
        setOpenImageModal(true);
        setImageModalIndex(index);
    };

    const closeImageModal = () => {
        setOpenImageModal(false);
    };

    // ----- Sort Function -----
    const sortCredits = (credits, sortBy, order) => {
        const list = [...credits];
        if (order === "ascending") {
            list.sort((a, b) =>
                (a[sortBy] || "") > (b[sortBy] || "") ? 1 : -1
            );
        } else if (order === "descending") {
            list.sort((a, b) =>
                (a[sortBy] || "") < (b[sortBy] || "") ? 1 : -1
            );
        }
        return list;
    };

    return (
        <>
            <div className="wrapper">
                {/* Person Info */}
                {isLoading ? (
                    <PersonInfoSkeleton />
                ) : (
                    <PersonInfo personData={personData} socials={socials} />
                )}

                {/* Persons Photos */}
                {personImages?.profiles?.length > 0 && (
                    <IndexedImageRow
                        title="Photos"
                        media={personImages.profiles}
                        setOpen={openImageModalWithIndex}
                    />
                )}

                {personImages?.profiles?.length > 0 && (
                    <BasicModal
                        open={openImageModal}
                        handleClose={closeImageModal}
                        children={
                            <Box sx={{ width: "100%", aspectRatio: "16 / 9" }}>
                                <ImageCarousel
                                    imageIndex={imageModalIndex}
                                    setImageIndex={setImageModalIndex}
                                    images={personImages.profiles}
                                    mediaTitle={personData.name}
                                />
                            </Box>
                        }
                    />
                )}

                {/* Movie Credits */}
                {movieCredits?.cast?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={sortCredits(
                            movieCredits?.cast || [],
                            "release_date",
                            movieSortOrder
                        )}
                        title="Movie Casting Credits"
                        mediaType="movie"
                        creditType="CA"
                    />
                )}
                {/* Movie Credits Sorting Dropdown */}
                {movieCredits?.cast?.length > 0 && (
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ color: "#fff" }}>Sort Movies by:</label>
                        <select
                            value={movieSortOrder}
                            onChange={(e) => setMovieSortOrder(e.target.value)}
                        >
                            <option value="descending">Newest First</option>
                            <option value="ascending">Oldest First</option>
                        </select>
                    </div>
                )}
                {movieCredits?.crew?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={combineCrewCredits(movieCredits?.crew)}
                        title="Movie Crew Credits"
                        mediaType="movie"
                    />
                )}

                {/* TV Credits */}
                {tvShowCredits?.cast?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={sortCredits(
                            tvShowCredits?.cast || [],
                            "first_air_date",
                            tvSortOrder
                        )}
                        title="TV Casting Credits"
                        mediaType="tv"
                        creditType="CA"
                    />
                )}
                {/* TV Credits Sorting Dropdown */}
                {tvShowCredits?.cast?.length > 0 && (
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ color: "#fff" }}>
                            Sort TV Shows by:
                        </label>
                        <select
                            value={tvSortOrder}
                            onChange={(e) => setTvSortOrder(e.target.value)}
                        >
                            <option value="descending">Newest First</option>
                            <option value="ascending">Oldest First</option>
                        </select>
                    </div>
                )}
                {tvShowCredits?.crew?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={combineCrewCredits(tvShowCredits?.crew)}
                        title="TV Crew Credits"
                        mediaType="tv"
                    />
                )}
            </div>
        </>
    );
};

export default Person;
