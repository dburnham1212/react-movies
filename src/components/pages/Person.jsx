import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";

import styles from "../../styles/pages/Person.module.css";
import MediaCreditGrid from "../utility/Grids/MediaCreditGrid";
import { combineCrewCredits } from "../../helper/helperFunctions";
import PersonInfo from "../utility/MediaInfo/PersonInfo";
import PersonInfoSkeleton from "../utility/MediaInfo/PersonInfoSkeleton";

const Person = () => {
    const [personData, setPersonData] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [tvShowCredits, setTvShowCredits] = useState({});
    const [socials, setSocials] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    const fetchPersonData = async () => {
        setIsLoading(true);

        try {
            const [personResponse, movieCreditsResponse, tvCreditsResponse, socialsResponse] = await Promise.all([
                makeApiCall(`${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`),
                makeApiCall(`${BASE_URL}/person/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`),
            ]);

            setPersonData(personResponse);
            setMovieCredits(movieCreditsResponse);
            setTvShowCredits(tvCreditsResponse);
            setSocials(socialsResponse);
        } catch (error) {
            console.error("Failed to fetch person data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonData();
    }, []);

    return (
        <>
            <div className="wrapper">
                {isLoading ? <PersonInfoSkeleton /> : <PersonInfo personData={personData} socials={socials} />}

                {movieCredits?.cast?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={movieCredits?.cast}
                        title="Movie Casting Credits"
                        mediaType={"movie"}
                        creditType={"CA"}
                    />
                )}
                {movieCredits?.crew?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={combineCrewCredits(movieCredits?.crew)}
                        title="Movie Crew Credits"
                        mediaType={"movie"}
                    />
                )}

                {tvShowCredits?.cast?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={tvShowCredits?.cast}
                        title="TV Casting Credits"
                        mediaType={"tv"}
                        creditType={"CA"}
                    />
                )}
                {tvShowCredits?.crew?.length > 0 && (
                    <MediaCreditGrid
                        mediaCredits={combineCrewCredits(tvShowCredits?.crew)}
                        title="TV Crew Credits"
                        mediaType={"tv"}
                    />
                )}
            </div>
        </>
    );
};

export default Person;
