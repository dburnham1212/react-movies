import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Movie.module.css";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Credits from "../utility/Credits/Credits";
import IndexedImageRow from "../utility/ImageRows/IndexedImageRow";
import BasicModal from "../utility/Modals/BasicModal";
import ImageCarousel from "../utility/Carousels/ImageCarousel";

const Movie = () => {
    // Jason Pilla the lady killa, with the power of ten gorillas
    const [movieData, setMovieData] = useState({});
    const [movieImages, setMovieImages] = useState({});

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieData(response);
        });

        makeApiCall(`${BASE_URL}/movie/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setMovieImages(response);
        });
    }, [id]);

    const openArtworkModalWithIndex = (index) => {
        setOpenArtworkModal(true);
        setArtworkModalIndex(index);
    };

    const closeArworkModal = () => {
        setOpenArtworkModal(false);
    };

    let ratingIndex = [];

    for (let index = 0; index < Math.round(movieData.vote_average / 2); index++) ratingIndex.push(1 + index);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content_left}>
                    <img
                        src={`${BASE_IMAGE_URL}${movieData.poster_path}`}
                        alt={`${movieData.title} poster`}
                        width={"360"}
                    />
                </div>
                <div className={styles.content_right}>
                    <h1>{movieData.title}</h1>
                    {movieData.original_title !== movieData.title && <h3>{movieData.original_title}</h3>}
                    {movieData.tagline && (
                        <p>
                            <i>{movieData.tagline}</i>
                        </p>
                    )}
                    <p>{movieData.overview}</p>
                    {movieData.adult && <p>Adults Only</p>}
                    {movieData?.genres?.length === 1 ? <h4>Genre:</h4> : <h4>Genres:</h4>}
                    <div className={styles.genre_container}>
                        <p>{movieData?.genres?.map((genre) => genre.name).join(", ")}</p>
                    </div>
                    <div className={styles.rating_container}>
                        {ratingIndex.map((value) => {
                            return <StarIcon sx={{ color: yellow[50] }} />;
                        })}
                    </div>
                    {movieData.homepage && (
                        <p>
                            <i>
                                Website: <a href={movieData.homepage}>{movieData.homepage}</a>
                            </i>
                        </p>
                    )}
                </div>
            </div>

            {movieImages.backdrops && (
                <IndexedImageRow title={"Gallery"} media={movieImages.backdrops} setOpen={openArtworkModalWithIndex} />
            )}
            {movieImages.backdrops && (
                <BasicModal
                    open={openArtworkModal}
                    handleClose={closeArworkModal}
                    children={
                        <ImageCarousel
                            imageIndex={artworkModalIndex}
                            setImageIndex={setArtworkModalIndex}
                            images={movieImages.backdrops}
                            mediaTitle={movieData.title || movieData.original_title}
                        />
                    }
                />
            )}
            <Credits />
        </>
    );
};

export default Movie;
