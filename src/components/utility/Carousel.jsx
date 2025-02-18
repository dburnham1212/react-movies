import { useEffect } from "react";

const Carousel = (props) => {
    const { trendingMovies } = props;

    useEffect(() => {
        console.log("===== Trending Movies =====")
        console.log(trendingMovies);
    }, []);

    return (
        <>
            <h1>This is the carousel</h1>
        </>
    );
};

export default Carousel;