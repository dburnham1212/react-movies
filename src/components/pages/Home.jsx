import { useState, useEffect } from "react";
// normally we would use a .env file to secure these values, for now i have put them into a file called constants
import { BASE_URL, API_KEY } from "../../constants/constants";
// import functions from the helper files
import { makeApiCall, refineMovies } from "../../helper/helperFunctions";

import styles from "../../styles/pages/Home.module.css";

import Carousel from "../utility/Carousel";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    makeApiCall(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`).then(
      (response) => setTrendingMovies(refineMovies(response.results))
    );
  }, []);

  return (
    <>
      <h1 className={styles.title}>This is the homepage</h1>
      {trendingMovies.length > 0 && (
        <Carousel trendingMovies={trendingMovies} />
      )}
    </>
  );
};

export default Home;
