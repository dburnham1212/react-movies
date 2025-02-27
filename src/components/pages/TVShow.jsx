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

const TVShow = () => {
    const [tvShowData, setTvShowData] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [tvShowAggCredits, setTvShowAggCredits] = useState({});
    const [tvShowImages, setTvShowImages] = useState({});
    const [tvShowVideos, setTvShowVideos] = useState([]);

    const [openArtworkModal, setOpenArtworkModal] = useState(false);
    const [artworkModalIndex, setArtworkModalIndex] = useState(0);

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

        // Videos
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
    }, []);

    const openArtworkModalWithIndex = (index) => {
        setOpenArtworkModal(true);
        setArtworkModalIndex(index);
    };

    const closeArworkModal = () => {
        setOpenArtworkModal(false);
    };

    //Code html here
    return (
        <>
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
                    {/*Display country(s) of origin */} 
                    {tvShowData?.production_countries?.map((country) => 
                    <img id = {styles.flag} src = {`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`} alt = {country.name}/>)} 
                    <p>{tvShowData?.production_countries?.map((country) => country.iso_3166_1).join(", ")} </p>
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
                    <h3>Genres:</h3> {/*genre display */}
                    <div className={styles.genre_container}>
                        <p>{tvShowData?.genres?.map((genre) => genre.name).join(", ")}</p>
                    </div>
                    <h4>Available languages:</h4>
                    <div className={styles.language_container}>
                        <p>{tvShowData?.spoken_languages?.map((language) => language.name + "/" + language.english_name).join(", ")}</p>
                    </div>
                    {/*show homepage link if available */}
                    {tvShowData.homepage && (
                        <p id={styles.homepage_link}>
                            Website: <a href={tvShowData.homepage}>{tvShowData.homepage}</a>
                        </p>
                    )}
                </div>
            </div>
            {/*carousel(s) go here */}
            {tvShowImages.backdrops && (
                <IndexedImageRow title={"Gallery"} media={tvShowImages.backdrops} setOpen={openArtworkModalWithIndex} />
            )}
            {tvShowImages.backdrops && (
                <BasicModal
                    open={openArtworkModal}
                    handleClose={closeArworkModal}
                    children={
                        <ImageCarousel
                            imageIndex={artworkModalIndex}
                            setImageIndex={setArtworkModalIndex}
                            images={tvShowImages.backdrops}
                        />
                    }
                />
            )}
            {Object.keys(tvShowCredits).length && <Credits credits={tvShowCredits} />}
        </>
    );
};

export default TVShow;
