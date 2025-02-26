import { useState, useEffect } from "react";
// normally we would use a .env file to secure these values, for now i have put them into a file called constants
import { BASE_URL } from "../../constants/constants";
// import functions from the helper files
import { makeApiCall, refineMovies } from "../../helper/helperFunctions";

import styles from "../../styles/pages/Home.module.css";

import MainCarousel from "../utility/Carousels/MainCarousel";

const Home = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        makeApiCall(`${BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`).then((response) =>
            setTrending(response.results)
        );
    }, []);

    return (
        <>
            <div style={{ maxHeight: "650px", width: "100%", height: "650px" }}>
                {trending.length && <MainCarousel mediaData={trending} />}
            </div>
        </>
    );
};

export default Home;
