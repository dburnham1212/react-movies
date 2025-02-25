import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";

const Episode = () => {
    const [episodeData, setEpisodeData] = useState({});

    const { id } = useParams();

    useEffect(() => {
        makeApiCall(`${BASE_URL}/tv/${66732}/season/${1}/episode/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then(
            (response) => {
                console.log(response);
                setEpisodeData(response);
            }
        );
    }, []);

    return (
        <>
            <h1>{episodeData.name}</h1>
            <img src={`${BASE_IMAGE_URL}${episodeData.still_path}`} />
        </>
    );
};

export default Episode;
