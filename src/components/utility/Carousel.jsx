import { useEffect } from "react";

import styles from "../../styles/utility/Carousel.module.css";

const Carousel = (props) => {
  const { trendingMovies } = props;

  useEffect(() => {
    console.log("===== Trending Movies =====");
    console.log(trendingMovies);
  }, []);

  return (
    <>
      <h1 className={styles.title}>This is the carousel</h1>
    </>
  );
};

export default Carousel;
