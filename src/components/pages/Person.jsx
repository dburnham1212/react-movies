import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";

import styles from "../../styles/pages/Person.module.css";
import MediaCreditCard from "../utility/Cards/MediaCreditCard";

const Person = () => {
    const [personData, setPersonData] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});

    const { id } = useParams();

    useEffect(() => {
        // Tania H
        makeApiCall(`${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== PERSON DATA =====");
            console.log(response);
            setPersonData(response);
        });

        makeApiCall(`${BASE_URL}/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log("===== MOVIE CREDITS =====");
                console.log(response);
                setMovieCredits(response);
            }
        );

        makeApiCall(`${BASE_URL}/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log("===== TV CREDITS =====");
            console.log(response);
            setTvShowCredits(response);
        });
    }, [id]);

    return (
        <>
            <div className={styles.flex_info_container}>
                <div className={styles.info_left}>
                    <img
                        className={styles.img}
                        src={`${BASE_IMAGE_URL}${personData.profile_path}`}
                        alt={`${personData.name} profile`}
                        width={"360"}
                    />
                </div>
                <div className={styles.info_right}>
                    <h1>{personData.name}</h1>
                    {!personData.name && <h1>{personData.original_name}</h1>}

                    {/* Known Aliases */}
                    {personData.also_known_as && personData.also_known_as.length > 0 && (
                        <div className={styles.aliases}>
                            <h3>Also Known As:</h3>
                            <p>{personData.also_known_as.join(", ")}</p>
                        </div>
                    )}

                    {/*Birth Details*/}
                    <div className={styles.details}>
                        <h3>Details:</h3>
                        <p>Born On: {personData.birthday}</p>
                        {personData.deathday && <p>Died On: {personData.deathday}</p>}
                        <p>Place of Birth: {personData.place_of_birth}</p>
                    </div>

                    {/*Biography */}
                    <h3>Biography:</h3>
                    {personData.biography && <p id={styles.biography}>{personData.biography}</p>}

                    {/* Known For*/}
                    {personData.known_for_department && (
                        <div className={styles.known_for_container}>
                            <h3>Known For:</h3>
                            <p>{personData.known_for_department}</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h1>This is movie credits</h1>
                {movieCredits?.cast?.map((credit) => {
                    return <MediaCreditCard media={credit} />;
                })}
            </div>
        </>
    );
};

export default Person;
