import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/TVShow.module.css";

const TVShow = () => {
    const [tvShowData, setTvShowData] = useState({});

    const { id } = useParams();

    //Function to get api data from db
    useEffect(() => {
        makeApiCall(`${BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setTvShowData(response);
        });
    }, []);

    //Code html here
    return (
        <>
            <div className = {styles.flex_info_container}>            {/*Flexbox info container*/}
                <div className = {styles.info_left}>        {/*Flexbox info left*/}
                        <img
                        src={`${BASE_IMAGE_URL}${tvShowData.poster_path}`}
                        alt={`${tvShowData.title} poster`}
                        width={"360"}
                        />
                </div>
                <div className = {styles.info_right}>       {/*Flexbox info right*/}
                    <h1>{tvShowData.name}</h1>         {/*Title*/}
                    {/*if show doesn't have a title in local language, display original title*/}
                    {!tvShowData.name && <h1>{tvShowData.original_name}</h1>}

                    {/*if show has a tagline, display tagline*/}
                    {tvShowData.tagline && (
                        <p>
                            <p id = {styles.tagline}>{tvShowData.tagline}</p>
                        </p>
                    )}
                    <p id = {styles.overview}>{tvShowData.overview}</p>     {/*info paragraph */}
                    {tvShowData.adult && <p id = {styles.adult_warning}>Adults Only 18+</p>}    {/*R warning */}
                    <h3>Ganres:</h3>    {/*genre display */}
                    <div className = {styles.genre_container}>
                        {tvShowData?.genres?.map((genre, index) => {
                            let comma = "";
                            if (index) comma = ", ";
                            return (
                                <p key = {index}>
                                    {comma}{genre.name}
                                </p>
                            );
                        })}
                    </div>
                    {/*Ratings mui here*/}
                    {/*show homepage link if available */}
                    {tvShowData.homepage && (
                        <p id = {styles.homepage_link}>
                            Website: <a href = {tvShowData.homepage}>{tvShowData.homepage}</a>
                        </p>
                    )}
                </div>
            </div>
            {/*carousel(s) go here */} 
        </>
    );
};

export default TVShow;
