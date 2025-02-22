import { useState, useEffect } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { API_KEY, BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/TVShow.module.css";

const TVShow = () => {
  const [tvShowData, setTvShowData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    makeApiCall(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`).then((response) => {
      console.log(response);
      setTvShowData(response);
    });
  }, []);

  return (
    <>
      <h1 className={styles.title}>{tvShowData.name}</h1>
      <img src={`${BASE_IMAGE_URL}${tvShowData.poster_path}`} />
    </>
  );
};

export default TVShow;
