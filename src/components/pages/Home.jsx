import { useState, useEffect } from "react";
// normally we would use a .env file to secure these values, for now i have put them into a file called constants
import { BASE_URL, API_KEY } from "../../constants/constants";
import { makeApiCall } from "../../helper/helperFunctions";
import Carousel from "../utility/Carousel";

const Home = () => {

    // This is an example of the useState hook, think of it like a declaration and a setter function
    // In this first example trendingMovies is the declaration and setTrendingMovies is the setter function 
    // The variable will be set to anything inside the brackets in the useState hook 
    // The trendingMovies variable would then be initialized to an empty array []
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);

    useEffect(() => {
        // This is an example of the use effect hook!
        // We can use the use effect hook to create api calls
        // use effect will happen after the page renders for the first time 

        // lets start by making a few API calls to TMDB
        makeApiCall(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`)
            .then((response) => {
                setTrendingMovies(response.results);
            });

        makeApiCall(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
            .then((response) => {
                console.log("===== Genre List =====")
                console.log(response.genres);
                setMovieGenres(response.genres);
            }) 

        makeApiCall(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${28}`)
            .then((response) => {
                console.log("===== Action Movies =====")
                console.log(response.results);
                setActionMovies(response.results);
        });
    }, []);

    return (
    <>
        <h1>This is the homepage</h1>
        {trendingMovies.length > 0 && 
        <Carousel 
            trendingMovies={trendingMovies}
        />}
        
    </>
    );
};

export default Home;